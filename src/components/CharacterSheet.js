import  "./CharacterSheet.css";
import { FateCoreSheet } from './CharacterSheets/FateCoreSheet';
import { v4 as uuidv4 } from 'uuid';
import React, { useState } from 'react';

export const CharacterSheet = ({ rollDice, character, updateCharacter, gm=false, 
  userID=0, users=[]}) => {
  const [characterData, setCharacterData] = useState({...character});

  // Adds an owner to the character
  const addOwner = (e) => {
    e.preventDefault();
    console.log(e);
    const selectElement = e.target[1];
    if (selectElement == null) {
      return;
    }
    const addedUser = users.find( (user) => user.userID === selectElement.value);
    if (addedUser == null) {
      return;
    }
    console.log(addedUser)
    const updatedUsers = characterData.owners != null ?
      [...characterData.owners, addedUser] : [addedUser]
    const updatedCharacter = {...characterData,
      owners: updatedUsers}
    saveCharacterData(updatedCharacter);
  }

  // calls updateCharacter with currrent character info
  const saveCharacter = (e) => {
    // If the character doesn't have an ID, add it
    if (characterData._id == null ){
      const id =  uuidv4();
      const updatedCharacter = {...characterData, _id: id};
      setCharacterData(updatedCharacter)
      updateCharacter(updatedCharacter);
    }
    else {
      updateCharacter({...characterData});
    }
  }

  // calls updateCharacter with currrent character info
  const saveCharacterData = (updatedCharacter) => {
    setCharacterData(updatedCharacter);
    // If the character doesn't have an ID, add it
    if (characterData._id == null ){
      const id =  uuidv4();
      updateCharacter({...updatedCharacter, _id: id});
    }
    else {
      updateCharacter(updatedCharacter);
    }
  }

  // Check whether user can edit sheet
  const canEdit = character.owners.some((user) => user.userID === userID) || gm;
  const editActive = canEdit;

  let sheet;
  switch (character.format) {
    case 'Fate Core':
      sheet = <FateCoreSheet rollDice={rollDice} character={characterData} 
        gm={gm} setCharacterData={setCharacterData} editActive={editActive} canEdit={canEdit}
        saveCharacterData={saveCharacterData} userID={userID}/>
      break;
    default:
      console.log(character);
      sheet = <p>Error: No sheet component available for this character format</p>
  }

  return (
    <div className='character'>
      {(character._id != null && gm) &&
        <div>
          <br/>
        <b >Owners:</b>
        <div >
          {characterData.owners &&
            <span>{characterData.owners.map( user => user.username)
              .join(', ')}</span>
          }
        </div>
        <br />
        <form onSubmit={addOwner}>
          <button>Add owner</button>
          <select id="ownerSelect">
            {users.map( (user, i) => (
                <option key={i} value={user.userID}>{user.username}</option>
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