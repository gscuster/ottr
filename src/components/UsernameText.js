import { EditableText } from './EditableText';
import { EditButton } from './EditButton';
import AccountEdit from '../res/mdi/account-edit.svg'
import React, { useState } from "react";
import './UsernameText.css';

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