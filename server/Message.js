export const onMessage = (msg, io, socket) => {
  console.log('Received: ' + msg);
  switch (parseMessageType(msg)) {
    case '/roll':
    case '/r':
      console.log('Rolling');
      break;
    default:
      io.emit('message', {
        username: socket.username,
        message: msg
      });
  }
}

const parseMessageType = (msg) => {
  const spacePattern = /\s+/;
  const msgFormatted = msg.trim().split(spacePattern)
  if (msgFormatted.length > 0 &&  msgFormatted[0].startsWith('/')) {
    return msgFormatted[0];
  }

  return 'message';
}