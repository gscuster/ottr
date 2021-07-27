import './GameFeed.css'
import {FeedItem} from './FeedItem.js';
import {FeedForm} from './FeedForm.js';
import {UsernameForm} from './UsernameForm.js';

export const GameFeed = ({feed=[], sendMessage, userSelected, selectUserName}) => { 
  return (
    <div className="game-feed">
    <p>Open TableTop RPG</p>
    <ul className="feed-list">
      {feed.map((feedItem, i) => 
        <FeedItem feedItem={feedItem} prev={feed[i-1]} next={feed[i+1]}/>)}
    </ul>
    {userSelected ? 
      // If we've picked a user, use normal feed input
      <FeedForm sendMessage={sendMessage}/> : 
      // Otherwise, prompt for username selection
      <UsernameForm selectUserName={selectUserName}/>}
    </div>
  );
}