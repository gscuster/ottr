export const onMessage = (msg, io, socket) => {
  console.log('message: ' + msg);
    io.emit('message', {
      username: socket.username,
      message: msg
    });
}