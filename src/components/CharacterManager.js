import * as Characters from '../utilities/Characters.js';
import './CharacterManager.css';

export const CharacterManager = ({gameData={}, gm=false, openCharacters,
  setOpenCharacters}) => {
  const createCharacter = () => {
    console.log('Creating a new character');
    setOpenCharacters([...openCharacters, Characters.getCharacter('Fate Core')]);
  }

  return (
    <div className='character-manager'>
      <h2>Characters:</h2>
      {gm && 
        <button onClick={createCharacter}>Create Character</button>
      }
      
      {gameData.characters != null && gameData.characters.map( (character, i) => (
          <p key={i}>{character.name}</p>
        ))}
    </div>
  );
}

