import  "./CharacterSheet.css";
import { FateCoreSheet } from './CharacterSheets/FateCoreSheet';
import { v4 as uuidv4 } from 'uuid';

export const CharacterSheet = ({ rollDice, character, updateCharacter}) => {
  const saveCharacter = () => {
    console.log('Saving character');
    const id =  uuidv4();
    updateCharacter({...character, _id: id});
  }
  
  let sheet;
  switch (character.format) {
    case 'Fate Core':
      sheet = <FateCoreSheet rollDice={rollDice} character={character}/>
      break;
    default:
      console.log(character);
      sheet = <p>Error: No sheet component available for this character format</p>
  }
  return (
    <div className='character'>
      {character._id == null && <button onClick={saveCharacter}>Save Character</button>}
      {sheet}
    </div>
  );
}