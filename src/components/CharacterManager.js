import * as Characters from '../utilities/Characters.js';
import './CharacterManager.css';

export const CharacterManager = ({gameData={}, gm=false, openCharacters,
  setOpenCharacters, userID}) => {
  const createCharacter = () => {
    console.log('Creating a new character');
    setOpenCharacters([...openCharacters, Characters.getCharacter('Fate Core')]);
  }

  const newCharacterTab = (e) => {
    e.preventDefault();
    if (openCharacters.find((character) => (character._id === e.target.id)) == null) {
      const character = gameData.characters.find((character) => (character._id === e.target.id));
      character != null && setOpenCharacters([...openCharacters, character]);
    }
  }

  const isOwner = character => character.owners.some((user) => user.userID === userID);

  return (
    <div className='character-manager'>
      <h2>Characters:</h2>
      {gm && 
        <button onClick={createCharacter}>Create Character</button>
      }
      
      <ul>
        {gameData.characters != null && gameData.characters.map( (character, i) =>  { 
          if (gm || character.visibility === 'all' || isOwner(character)) {
            return (
              <li key={i}>
                <a id={character._id} href={character.name} onClick={newCharacterTab}>{character.name}</a>
              </li>
            )
          }
          else return false;
          })
        }
      </ul>
      
    </div>
  );
}

