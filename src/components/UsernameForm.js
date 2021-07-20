import React, { useState } from "react";

export const UsernameForm = ({socket}) => {
  const [userName, setUserName] = useState("");
  
  const handleSubmit = (e) => {
      e.preventDefault();
      if (userName) {
      }
  }

  return (
    <form className="feed-form" onSubmit={handleSubmit}>
      <input type="text" 
        className="feed-input"
        autoComplete="off"
        value={userName}
        placeholder='UserName'
        onChange={e => setUserName(e.target.value)}/>
      <button>Connect</button>
    </form>
  )
}