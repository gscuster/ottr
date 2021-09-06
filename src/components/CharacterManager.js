import './CharacterManager.css';

export const CharacterManager = ({gameData={}, gm=false}) => (
  <div className='character-manager'>
    <h2>Characters:</h2>
    {gm && 
      <button>Create Character</button>
    }
    
    {gameData.characters != null && gameData.characters.map( (character, i) => (
        <p key={i}>{character.name}</p>
      ))}
  </div>
)