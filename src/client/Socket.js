import io from 'socket.io-client';
import EventEmitter from 'events';

const port = '4000';
const address = window.location.hostname + ':' + port;
const socket = io(address, {autoConnect: false});
export const Socket = new EventEmitter();

/**
 * Register listeners for events
 */
export const setup = () => {
  socket.on('connect', () => onConnectionStateUpdate());
  socket.on('disconnect', () => onConnectionStateUpdate());
  socket.on('message', (content) => onMessage(content));
  socket.on('session', ({sessionID, userID, username}) => onSession(sessionID, userID, username));
  socket.on('connect_error', (err) => onConnectionError(err));
  socket.on('username_edited', (username) => {Socket.emit('connectedAs', username)});
  socket.on('feed', (feed) => {Socket.emit('feed', feed)});

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

/**
 * Remove all listeners from events
 */
export const teardown = () => {
  socket.off('connect');
  socket.off('disconnect');
  socket.off('message');
  socket.off('session');
  socket.off('connect_error');
}

/**
 * Handle issues with connection
 * @param {Error} err 
 */
function onConnectionError(err) {
  if (err.message === "invalid username") {
    // Reset user selection
    const userSelected = false;
    console.log(`Connection error`);
    Socket.emit('userSelected', userSelected);
  }
}

/**
 * Unused
 */
function onConnectionStateUpdate() {
}

/**
 * Pass on received messages
 * @param {Object} content 
 */
function onMessage(content) {
  Socket.emit('message', content);
}

/**
 * Sets and stores session information
 * @param {String} sessionID 
 * @param {String} userID 
 * @param {String} username 
 */
function onSession(sessionID, userID, username) {
  socket.auth = { sessionID };
  // store it in the localStorage
  localStorage.setItem("sessionID", sessionID);
  // save the ID of the user
  socket.userID = userID;
  Socket.emit('connectedAs', username);

  // Get feed messages
  socket.emit('getFeed');
}

/**
 * Submit a change to the username
 * @param {String} username 
 */
export const editUserName = (username) => {
  if (username) {
    socket.emit('changeUserName', username);
  }
}

/**
 * Send a dice roll message to the server
 * @param {Event} evt 
 */
export const rollDice = (evt) => {
  console.log(evt);
  const defaultRoll = '/r 4dF';
  const modifier = evt.target.getAttribute('rating');
  const skill = evt.target.getAttribute('skill');
  const character = evt.target.getAttribute('character');
  const message = (modifier != null && modifier !== '0') ? 
    defaultRoll + ` + ${modifier}` : defaultRoll
  socket.emit('message', message, {skill: skill, character: character});
}

/**
 * Send a message to the server
 * @param {String} message 
 */
export const sendMessage = (message) => {
  socket.emit('message', message);
}

/**
 * Perform the initial connection setup with the given username
 * @param {String} username 
 */
export const selectUserName = (username) => {
  if (username) {
    socket.auth = { username };
    socket.connect();
    const userSelected = true;
    Socket.emit('userSelected', userSelected);
  }
}