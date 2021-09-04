import * as Message from './Message.js';
import * as Database from './Database.js';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const port = 4000;

let sessionData = [];
let gameState = {gameActive: null, gameList: [], gameData: null};

// Get the collection from the database
const client = Database.connect();
const collection = Database.getCollection(client, 'default');
let gameCollection = null;

const setGameState = (newGameState) => {
  gameState = newGameState;
}

/**
 * Middleware that sets up session either by using the provided sessionID or
 * creating a new one.
 */
io.use(async (socket, next) => {
  // Get the session data from the database, if it exists
  try {
    sessionData = (await (await collection).findOne({'_id': 'sessionData'})).sessionData ?? [];
  }
  catch {
    sessionData = [];
  }

  const sessionID = socket.handshake.auth.sessionID;

  if (sessionID) {
    // find existing session
    const session = sessionData.find((session) =>
      session.sessionID === sessionID);
    if (session) {
      socket.sessionID = sessionID;
      socket.userID = session.userID;
      socket.username = session.username;
      return next();
    }
  }

  const username = socket.handshake.auth.username;
  if (!username) {
    return next(new Error("invalid username"));
  }
  // create new session
  socket.sessionID = uuidv4();
  socket.userID = uuidv4();
  socket.username = username;
  const sessionInfo = {
    sessionID: socket.sessionID, 
    userID: socket.userID, 
    username
  };
  sessionData.push(sessionInfo);
  // Update the session data in the database
  Database.updateArray(collection, 'sessionData', 'sessionData', sessionInfo);
  next();
});

/**
 * Set things up once we have a connection
 */
io.on('connection', socket => {
  console.log(`connect: ${socket.id} for user: ${socket.username}`);

  /**
   * Let everyone know a user has disconnected
   */
  socket.on('disconnect', () => {
    console.log(`disconnect: ${socket.id}`);
    // Create basic output object
    const systemMsg = {
      type: 'message',
      username: 'System',
      userID: '',
      message: `User ${socket.username} has disconnected.`
    }
    io.emit('message', systemMsg);
  });

  // Pass incoming messages off
  socket.on('message', (msg, data=null) => Message.onMessage(msg, data, io, socket, collection));
  
  // Get the game state on request
  socket.on('getGameState', async () => {
    if (gameState.gameActive != null) {
      // We're in a game, send it back
      socket.emit('gameState', gameState);
      console.log('We are in a game. Sending the state');
    }
    else {
      // We're not in a game, get a list of available games to send back
      let gameList;
      try {
        gameList = (await (await collection).findOne({'_id': 'game_data'})).game_list ?? [];
      }
      catch {
        gameList = [];
      }
      const newGameState = {gameActive: null, gameList: gameList};
      setGameState(newGameState);
      socket.emit('gameState', newGameState);
    }
  });

  // Get the feed from the database on request
  socket.on('getFeed', async () => {
    let feed;
    try {
      feed = (await (await collection).findOne({'_id': 'game_data'})).main_feed ?? [];
    }
    catch {
      feed = [];
    }
    socket.emit('feed', feed);
  });

  // Set the game
  socket.on('selectGame', async (gameName) => {
    // Check for a valid game name
    const pattern = /^[A-Za-z0-9_-]{1,48}$/;
    if (!gameName.match(pattern)) {
      socket.emit('gameState', gameState);
      return;
    }
    
    // Get the collection for this game
    try {
      gameCollection = await Database.getCollection(client, gameName);

      // Get the data for this game
      const gameData = (await gameCollection.findOne({'_id': 'game_data'})) ?? 
        {gm: null};

      // Check if the game has a GM. If not, make the user that selected the game GM
      if (gameData.gm == null) {
        gameData.gm = [socket.userID];
        console.log(gameData.gm);
        Database.updateArray(gameCollection, 'game_data', 'gm', gameData.gm)
      }
      if (!gameState.gameList.includes(gameName)) {
        console.log('Adding game to list');
        const newGameState = {
          gameActive: gameName, 
          gameList: [...gameState.gameList, gameName],
          gameData: gameData
        }
        setGameState(newGameState);
        // Add the new game to the list of games
        Database.updateArray(collection, 'game_data', 'game_list', gameName);
        socket.emit('gameState', newGameState);
        console.log('Sending state update with active game');
      }
      else {
        const newGameState = {
          gameActive: gameName, 
          gameList: [...gameState.gameList],
          gameData: gameData
        }
        setGameState(newGameState);
        socket.emit('gameState', newGameState);
        console.log('Sending state update with active game');
      }
    }
    catch (error) {
      socket.emit('gameState', gameState);
      console.log(error);
      console.log('Something went wrong, just sending current state back');
    }
    
  });

  /**
   * Handles a requested username change.
   */
  socket.on('changeUserName', async (username) => {
    if (username) {
      socket.username = username;
      const {sessionID, userID} = socket;
      sessionData = sessionData.map((session) => {
        return session.sessionID === socket.sessionID ? 
          {sessionID, userID, username} :
          session;
      });
       // Update in database as well
       const filter = { 
        _id: 'sessionData',
        'sessionData.sessionID': sessionID 
      };
      const updateDoc = {
        $set: {
          'sessionData.$.username': username
        }
      };
      try {
        (await collection).updateOne(filter, updateDoc);
      }
      catch {
        // Do nothing
      }

      socket.emit('username_edited', username);
    }
  })

  socket.emit("session", {
    sessionID: socket.sessionID,
    userID: socket.userID,
    username: socket.username
  });

  // Let everyone know a user has connected
  const systemMsg = {
    type: 'message',
    username: 'System',
    userID: '',
    message: `User ${socket.username} has connected.`
  }
  io.emit('message', systemMsg);
});

io.listen(port, {
  cors: {
    origin: '*'
  }
});

