import './GameFeed.css'
import FeedList from './FeedList.js';
import {FeedForm} from './FeedForm.js';
import { UsernameText } from './UsernameText';

/**
 * React component. Game feed with some text and the username as a header, feed
 * list as the body, and a feed form as the footer.
 * @param {*} param0 
 * @returns 
 */
export const GameFeed = ({feed=[], sendMessage, username, editUserActive, 
  setEditUserActive, editUserName, rollDice, userID=''}) => { 
  
  return (
    <div className="game-feed">
      <div className="header">
        <h3 className="feed-title">Open TableTop RPG</h3>
        {username && 
          <UsernameText username={username} 
            editActive={editUserActive}
            setEditUserActive={setEditUserActive}
            editUserName={editUserName}/>}
      </div>

      <FeedList feed={feed} divClass={"body"} listClass={"feed-list"} userID={userID}/>
    
      <div className="footer">
        <FeedForm sendMessage={sendMessage} rollDice={rollDice}/>
      </div>
    </div>
  );
}