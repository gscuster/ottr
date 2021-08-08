import io from 'socket.io-client';
import EventEmitter from 'events';

const port = '4000';
const address = window.location.hostname + ':' + port;
const socket = io(address, {autoConnect: false});
export const Socket = new EventEmitter();

export const setup = () => {
  socket.on('connect', () => onConnectionStateUpdate());
  socket.on('disconnect', () => onConnectionStateUpdate());
  socket.on('message', (content) => onMessage(content));
  socket.on('session', ({sessionID, userID, username}) => onSession(sessionID, userID, username));
  socket.on('connect_error', (err) => onConnectionError(err));
  socket.on('username_edited', (username) => {Socket.emit('connectedAs', username)});

  // Get stored session ID
  const sessionID = localStorage.getItem("sessionID");

  // If we've got a stored session ID, good to go
  if (sessionID) {
    socket.auth = { sessionID };
    socket.connect();
    const userSelected = true;
    Socket.emit('userSelected', userSelected);
  }
}

export const teardown = () => {
  socket.off('connect');
  socket.off('disconnect');
  socket.off('message');
  socket.off('session');
  socket.off('connect_error');
}

function onConnectionError(err) {
  if (err.message === "invalid username") {
    // Reset user selection
    const userSelected = false;
    console.log(`Connection error`);
    Socket.emit('userSelected', userSelected);
  }
}

function onConnectionStateUpdate() {
}

function onMessage(content) {
  Socket.emit('message', content);
}

function onSession(sessionID, userID, username) {
  socket.auth = { sessionID };
  // store it in the localStorage
  localStorage.setItem("sessionID", sessionID);
  // save the ID of the user
  socket.userID = userID;
  Socket.emit('connectedAs', username);
  console.log(userID);
}

export const editUserName = (username) => {
  if (username) {
    socket.emit('changeUserName', username);
  }
}

export const sendMessage = (message) => {
  socket.emit('message', message);
}

export const selectUserName = (username) => {
  if (username) {
    socket.auth = { username };
    socket.connect();
    const userSelected = true;
    Socket.emit('userSelected', userSelected);
  }
}