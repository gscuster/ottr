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

// Get the collection from the database
const collection = Database.connect();

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

