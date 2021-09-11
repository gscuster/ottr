import  "./CharacterSheet.css";
import { FateCoreSheet } from './CharacterSheets/FateCoreSheet';
import { v4 as uuidv4 } from 'uuid';
import React, { useState } from 'react';

export const CharacterSheet = ({ rollDice, character, updateCharacter, gm=false, userID=0, users=[]}) => {
  const [characterData, setCharacterData] = useState({...character});
  const saveCharacter = () => {
    if (characterData._id == null ){
      const id =  uuidv4();
      updateCharacter({...characterData, _id: id});
    }
    else {
      updateCharacter({...characterData});
    }
    
  }
  const addOwner = (e) => {
    e.preventDefault();
    console.log(e);
    //const updatedCharacter = {...characterData,
    //  owners: [...characterData.owners, e.target.value]}
  }
  
  let sheet;
  switch (character.format) {
    case 'Fate Core':
      sheet = <FateCoreSheet rollDice={rollDice} character={characterData} 
        gm={gm} setCharacterData={setCharacterData} canEdit={users.includes(userID) || gm}/>
      break;
    default:
      console.log(character);
      sheet = <p>Error: No sheet component available for this character format</p>
  }
  return (
    <div className='character'>
      {characterData._id == null && <button onClick={saveCharacter}>Save Character</button>}
      {(characterData._id != null) && (gm || (characterData.owners != null && characterData.owners.includes(userID))) && 
        <button onClick={saveCharacter}>Update Character</button>}
      {(character._id != null && gm) &&
        <div>
          <br/>
        <b >Owners:</b>
        <div >
          {characterData.owners.map( (user, i) => (
              <span key={i}>{user.username}</span>
            ))
          }
        </div>
        <br />
        <form onSubmit={addOwner}>
          <button>Add owner</button>
          <select >
            {users.filter( (user) => !gm)
              .map( (user, i) => (
                <option key={i} value={user}>{user.username}</option>
              ))
            }
          </select>
        </form>
        </div>
      }
      {sheet}
    </div>
  );
}