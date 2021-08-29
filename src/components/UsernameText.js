import { EditableText } from './EditableText';
import { EditButton } from './EditButton';
import AccountEdit from '../res/mdi/account-edit.svg'
import React, { useState } from "react";
import './UsernameText.css';

/**
 * React component. Contains an EditableText component and an EditButton.
 * Pressing the EditButton submits the opposite of editActive to 
 * setEditUserActive. If editActive is true, the editButton will also submit
 * the text from EditableText to editUsername.
 * @param {*} param0 
 * @returns 
 */
export const UsernameText = ({username, editActive, editUserName, setEditUserActive}) => {
  const [userName, setUserName] = useState("");
  
  const handleSubmit = (e) => {
      e.preventDefault();
      editUserName(userName);
      if (editActive) {
        setEditUserActive(false);
      }
  }
  const onClick = (e) => {
    if (editActive) {
      editUserName(userName)
    }
    setEditUserActive(!editActive);
  }

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <EditableText inputText={username} editActive={editActive} setValue={setUserName}/>
      <EditButton  height="20px" onClick={onClick} icon={AccountEdit}/>
    </form>
  );
}