import  "./CharacterSheet.css";
import { FateCoreSheet } from './CharacterSheets/FateCoreSheet';

export const CharacterSheet = ({ rollDice, character}) => {
  const saveCharacter = () => {
    
  }
  let sheet;
  switch (character.format) {
    case 'Fate Core':
      sheet = <FateCoreSheet rollDice={rollDice} character={character}/>
      break;
    default:
      sheet = <p>Error: No sheet component available for this character format</p>
  }
  return (
    <div className='character'>
      {character._id == null && <button onClick={saveCharacter}>Save Character</button>}
      {sheet}
    </div>
  );
}