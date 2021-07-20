import React, { useState } from "react";

export const FeedForm = ({socket}) => {
  const [message, setMessage] = useState("");
  
  const handleSubmit = (e) => {
      e.preventDefault();
      if (message) {
        socket.emit('message', message);
        setMessage('');
      }
  }

  return (
    <form className="feed-form" onSubmit={handleSubmit}>
      <input type="text" 
        className="feed-input"
        autoComplete="off"
        value={message}
        onChange={e => setMessage(e.target.value)}/>
      <button>Send</button>
    </form>
  )
}