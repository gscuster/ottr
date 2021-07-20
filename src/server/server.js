const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
const port = 4000;

io.on('connection', socket => {
  console.log(`connect: ${socket.id}`);

  socket.on('disconnect', () => {
    console.log(`disconnect: ${socket.id}`);
  });

  socket.on('message', (msg) => {
    console.log('message: ' + msg);
    io.emit('message', msg);
  });
});

io.listen(port, {
  cors: {
    origin: ["http://localhost:3000", "http://192.168.0.191:3000"]
  }
});


