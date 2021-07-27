import { DiceRoll } from 'rpg-dice-roller';

export const onMessage = (msg, io, socket) => {
  console.log('Received: ' + msg);

  // Create basic output object
  const message = {
    type: 'message',
    username: socket.username,
    userID: socket.userID,
    message: msg
  }

  // Get any applicable command properties
  const spacePattern = /\s+/;
  const msgSplit = msg.trim().split(spacePattern)
  const command = msgCommand(msgSplit)

  // Create the output
  const output = {...message, ...command};

  io.emit('message', output);
}

const msgCommand = (args) => {
  if (args.length === 0 || !args[0].startsWith('/')) {
    // Not a command
    return {};
  }
  switch (args[0]) {
    case '/roll': 
    case '/r':
      // Roll command, try rolling dice
      try {
        const input = args.slice(1).join(' ') || ' ';
        const roll = new DiceRoll(input);
        return {type: 'roll', roll: roll};
      }
      catch (e) {
        console.log(e);
        return {};
      }
  }
  return {};
}