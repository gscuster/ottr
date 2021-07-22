const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
const port = 4000;
const {v4: uuidv4} = require('uuid');

let sessionData = [];

io.use((socket, next) => {
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
  sessionData.push({
    sessionID: socket.sessionID, 
    userID: socket.userID, 
    username
  });
  next();
});

io.on('connection', socket => {
  console.log(`connect: ${socket.id}`);
  socket.emit("session", {
    sessionID: socket.sessionID,
    userID: socket.userID,
  });

  socket.on('disconnect', () => {
    console.log(`disconnect: ${socket.id}`);
  });

  socket.on('message', (msg) => {
    console.log('message: ' + msg);
    io.emit('message', {
      username: socket.username,
      message: msg
    });
  });
});

io.listen(port, {
  cors: {
    origin: ["http://localhost:3000", 
      "http://192.168.0.191:3000", 
      "http://192.168.0.4:3000"]
  }
});

