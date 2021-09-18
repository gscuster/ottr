import  "./CharacterSheet.css";
import { FateCoreSheet } from './CharacterSheets/FateCoreSheet';
import { v4 as uuidv4 } from 'uuid';
import React, { useState } from 'react';

export const CharacterSheet = ({ rollDice, character, updateCharacter, gm=false, 
  userID=0, users=[]}) => {
  const [characterData, setCharacterData] = useState({...character});
  const [editActive, setEditActive] = useState(character._id == null);

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
    setCharacterData(updatedCharacter);
    saveCharacter();
  }

  const cancelChanges = (e) => {
    e.preventDefault();
    setEditActive(false);
    setCharacterData({...character});
  }

  // calls updateCharacter with currrent character info
  const saveCharacter = (e) => {
    // If the character doesn't have an ID, add it
    if (characterData._id == null ){
      const id =  uuidv4();
      updateCharacter({...characterData, _id: id});
    }
    else {
      updateCharacter({...characterData});
    }
    setEditActive(false);
  }

  

  const handleEditActive = () => {
    setEditActive(true);
  }
  
  let sheet;
  switch (character.format) {
    case 'Fate Core':
      sheet = <FateCoreSheet rollDice={rollDice} character={characterData} 
        gm={gm} setCharacterData={setCharacterData} editActive={editActive}/>
      break;
    default:
      console.log(character);
      sheet = <p>Error: No sheet component available for this character format</p>
  }

  // Check whether user can edit sheet
  const canEdit = users.some((user) => user.userID === userID) || gm;

  return (
    <div className='character'>
      {canEdit && characterData._id == null && <button onClick={saveCharacter}>Save Character</button>}
      {canEdit && !editActive && characterData._id != null && 
        <button onClick={handleEditActive}>Edit Character</button>}
      
      {editActive && characterData._id != null &&
        <form>
          <input type='button' onClick={saveCharacter} value='Update Character'/>
          <input type='button' onClick={cancelChanges} value='Cancel Changes'/>
        </form>
      }

      {(character._id != null && gm) &&
        <div>
          <br/>
        <b >Owners:</b>
        <div >
          {characterData.owners && characterData.owners.map( (user, i) => (
              <span key={i}>{user.username}</span>
            ))
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