import { DiceRoll } from 'rpg-dice-roller';

/**
 * Handles messages the server receives.
 * @param {String} msg 
 * @param {Object} data 
 * @param {Server} io 
 * @param {Socket} socket 
 * @param {Collection} collection 
 */
export const onMessage = async (msg, data, io, socket, collection) => {
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
  const command = msgCommand(msgSplit, data)

  // Create the output
  const output = {...message, ...command};

  const filter = { 
    _id: 'game_data'
  };
  const updateDoc = {
    $push: {
      'main_feed': output
    }
  };
  const options = { upsert: true };
  try {
    (await collection).updateOne(filter, updateDoc, options);
  }
  catch {
    // Do nothing
  }
  

  io.emit('message', output);
}

/**
 * Processes commands within a message
 * @param {Array<string>} args 
 * @param {Object} data 
 * @returns 
 */
const msgCommand = (args, data) => {
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
        const skill = data != null ? data.skill ?? null : null;
        const character = data != null ? data.character ?? null : null;
        return {type: 'roll', roll: roll.toJSON(), skill: skill, character: character};
      }
      catch (e) {
        console.log(e);
        return {};
      }
    default: // Do nothing. Message should get printed as normal.
  }
  return {};
}