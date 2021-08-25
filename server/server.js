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

io.use(async (socket, next) => {
  // Get the session data from the database, if it exists
  sessionData = (await (await collection).findOne({'_id': 'sessionData'})).sessionData ?? [];
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

io.on('connection', socket => {
  console.log(`connect: ${socket.id} for user: ${socket.username}`);
  socket.emit("session", {
    sessionID: socket.sessionID,
    userID: socket.userID,
    username: socket.username
  });

  socket.on('disconnect', () => {
    console.log(`disconnect: ${socket.id}`);
  });

  socket.on('message', (msg) => Message.onMessage(msg, io, socket));

  socket.on('changeUserName', (username) => {
    if (username) {
      socket.username = username;
      const {sessionID, userID} = socket;
      sessionData = sessionData.map((session) => {
        return session.sessionID === socket.sessionID ? 
          {sessionID, userID, username} :
          session;
      });
      socket.emit('username_edited', username);
    }
  })
});

io.listen(port, {
  cors: {
    origin: '*'
  }
});

