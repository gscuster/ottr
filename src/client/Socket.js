import io from 'socket.io-client';
import EventEmitter from 'events';

const address = '192.168.0.4:4000';
const socket = io(address, {autoConnect: false});
export const Socket = new EventEmitter();

export const connect = () => {
    socket.connect();
}

export const setup = () => {
  socket.on('connect', () => onConnectionStateUpdate());
  socket.on('disconnect', () => onConnectionStateUpdate());
  socket.on('message', (content) => onMessage(content));
  socket.on('session', ({sessionID, userID}) => onSession(sessionID, userID));
  socket.on('connect_error', (err) => onConnectionError(err));

  const sessionID = localStorage.getItem("sessionID");

  if (sessionID) {
    socket.auth = { sessionID };
    connect();
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
    const userSelected = false;
    Socket.emit('userSelected', userSelected);
  }
}

function onConnectionStateUpdate() {
}

function onMessage(content) {
  Socket.emit('message', content);
}

function onSession(sessionID, userID) {
  socket.auth = { sessionID };
  // store it in the localStorage
  localStorage.setItem("sessionID", sessionID);
  // save the ID of the user
  socket.userID = userID;
}

function selectUserName(username) {
  if (username) {
    socket.auth = { username };
    socket.connect();
    const userSelected = true;
    Socket.emit('userSelected', userSelected);
  }
}