import './GameFeed.css'
import FeedList from './FeedList.js';
import {FeedForm} from './FeedForm.js';
import {UsernameForm} from './UsernameForm.js';
import { UsernameText } from './UsernameText';

export const GameFeed = ({feed=[], sendMessage, userSelected, selectUserName, 
  username, editUserActive, setEditUserActive, editUserName, rollDice}) => { 
  
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

      <FeedList feed={feed} divClass={"body"} listClass={"feed-list"}/>
    
      <div className="footer">
        {userSelected ? 
          // If we've picked a user, use normal feed input
          <FeedForm sendMessage={sendMessage} rollDice={rollDice}/> : 
          // Otherwise, prompt for username selection
          <UsernameForm selectUserName={selectUserName}/>}
      </div>
    </div>
  );
}