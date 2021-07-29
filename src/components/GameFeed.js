import './GameFeed.css'
import {FeedItem} from './FeedItem.js';
import {FeedForm} from './FeedForm.js';
import {UsernameForm} from './UsernameForm.js';

export const GameFeed = ({feed=[], sendMessage, userSelected, selectUserName, username}) => { 
  return (
    <div className="game-feed">
    <p className="feed-title">Open TableTop RPG 
      {userSelected ? ': ' + (username || '') : ''}</p>
    <ul className="feed-list">
      {feed.map((feedItem, i) => 
        <FeedItem key={i} feedItem={feedItem} prev={feed[i-1]} next={feed[i+1]}/>)}
    </ul>
    {userSelected ? 
      // If we've picked a user, use normal feed input
      <FeedForm sendMessage={sendMessage}/> : 
      // Otherwise, prompt for username selection
      <UsernameForm selectUserName={selectUserName}/>}
    </div>
  );
}