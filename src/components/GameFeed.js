import './GameFeed.css'
import {FeedItem} from './FeedItem.js';
import React, { useState } from "react";

export const GameFeed = ({socket, feed=[], onSubmit}) => {
  const [message, setMessage] = useState("");
  
  const handleSubmit = (e) => {
      e.preventDefault();
      if (message) {
        socket.emit('message', message);
        onSubmit(message);
        setMessage('');
      }
  }
  
  return (
    <div className="game-feed">
    <p>Open TableTop RPG</p>
        <ul className="feed-list">
          {feed.map((feedItem, i) => <FeedItem key={i} feedItem={feedItem}/>)}
        </ul>
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