import './GameFeed.css'
import React, { useState } from "react";

export const GameFeed = ({socket}) => {
  const [message, setMessage] = useState("");
  
  const handleSubmit = (e) => {
      e.preventDefault();
      if (message) {
        socket.emit('message', message);
        setMessage('');
      }
  }
  
  return (
    <div className="game-feed">
    <p>Open TableTop RPG</p>
        <ul/>
        <form className="feed-form" onSubmit={handleSubmit}>
          <input type="text" 
            className="feed-input" 
            autoComplete="off"
            value={message}
            onChange={e => setMessage(e.target.value)}/>
          <button>Send</button>
        </form>
  </div>
  );
}