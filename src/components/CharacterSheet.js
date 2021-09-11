import  "./CharacterSheet.css";
import { FateCoreSheet } from './CharacterSheets/FateCoreSheet';
import { v4 as uuidv4 } from 'uuid';
import React, { useState } from 'react';

export const CharacterSheet = ({ rollDice, character, updateCharacter, gm=false, userID=0, users=[]}) => {
  const [characterData, setCharacterData] = useState({...character});
  const saveCharacter = () => {
    console.log('Saving character');
    const id =  uuidv4();
    updateCharacter({...characterData, _id: id});
  }
  
  let sheet;
  switch (character.format) {
    case 'Fate Core':
      sheet = <FateCoreSheet rollDice={rollDice} character={character} gm={gm}/>
      break;
    default:
      console.log(character);
      sheet = <p>Error: No sheet component available for this character format</p>
  }
  return (
    <div className='character'>
      {character._id == null && <button onClick={saveCharacter}>Save Character</button>}
      {(character._id != null) && (gm || (character.owners != null && character.owners.includes(userID))) && 
        <button onClick={saveCharacter}>Update Character</button>}
      {sheet}
    </div>
  );
}