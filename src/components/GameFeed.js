import './GameFeed.css'
import {FeedItem} from './FeedItem.js';
import {FeedForm} from './FeedForm.js';
import {UsernameForm} from './UsernameForm.js';
import { UsernameText } from './UsernameText';

export const GameFeed = ({feed=[], sendMessage, userSelected, selectUserName, 
  username, editUserActive, setEditUserActive, editUserName}) => { 
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
    
      <ul className="feed-list">
        {feed.map((feedItem, i) => 
          <FeedItem key={i} feedItem={feedItem} prev={feed[i-1]} next={feed[i+1]}/>)}
      </ul>
    
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