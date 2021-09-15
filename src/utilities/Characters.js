import { FateCoreSheet } from '../utilities/CharacterSheets/FateCoreSheet.js';
import { FateAcceleratedSheet } from '../utilities/CharacterSheets/FateAcceleratedSheet.js';

export const getCharacter = (format) => {
  let character = {};
  switch (format) {
    case 'Fate Core':
      character = {...FateCoreSheet};
      break;
    case 'Fate Accelerated':
      character = {...FateAcceleratedSheet};
      break;
    default:
      console.log('No match for character format');
  }
  return character;
}

export const getFormatList = () => {
  const formatList = ['Fate Core', 'Fate Accelerated']
  return formatList;
}