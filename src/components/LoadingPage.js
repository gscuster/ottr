import './LoadingPage.css';
import React, { useState } from "react";

export const LoadingPage = ({connectionStatus='', selectUserName}) => {
  const [userName, setUserName] = useState("");
  
  const handleSubmit = (e) => {
      e.preventDefault();
      selectUserName(userName)
  }

  return(
  <div className='loading-page'>
    {
      connectionStatus === 'no username' ? 
        <form onSubmit={handleSubmit}>
          <h2>Select a username</h2>
          <input type="text" 
            className="username-input"
            autoComplete="off"
            value={userName}
            placeholder='UserName'
            onChange={e => setUserName(e.target.value)}/>
          <button className='username-button'>Connect</button>
        </form> :
        <h2>Loading</h2>
    }
  </div>
  )
}
  