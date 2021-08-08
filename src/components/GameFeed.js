import './GameFeed.css'
import {FeedItem} from './FeedItem.js';
import {FeedForm} from './FeedForm.js';
import {UsernameForm} from './UsernameForm.js';
import { UsernameText } from './UsernameText';
import React, { useEffect, useRef } from "react";

export const GameFeed = ({feed=[], sendMessage, userSelected, selectUserName, 
  username, editUserActive, setEditUserActive, editUserName}) => { 

  const feedEndRef = useRef(null);
  const scrollToBottom = () => {
    feedEndRef.current.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [feed]);

  const onScrollEvent = (e) => {
    console.log(e);
  }
  
  return (
    <div className="game-feed">
      <div className="header">
        <h3 className="feed-title">Open TableTop RPG</h3>
        {(userSelected && username) && 
          <UsernameText username={username} 
            editActive={editUserActive}
            setEditUserActive={setEditUserActive}
            editUserName={editUserName}/>}
      </div>
      <div className="body" onScroll={onScrollEvent}>
        <ul className="feed-list">
          {feed.map((feedItem, i) => 
            <FeedItem key={i} feedItem={feedItem} prev={feed[i-1]} next={feed[i+1]}/>)}
        </ul>
        <div ref={feedEndRef}></div>
      </div>
    
      <div className="footer">
        {userSelected ? 
          // If we've picked a user, use normal feed input
          <FeedForm sendMessage={sendMessage}/> : 
          // Otherwise, prompt for username selection
          <UsernameForm selectUserName={selectUserName}/>}
      </div>
    </div>
  );
}