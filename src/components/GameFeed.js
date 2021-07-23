import './GameFeed.css'
import {FeedItem} from './FeedItem.js';
import {FeedForm} from './FeedForm.js';
import {UsernameForm} from './UsernameForm.js';

export const GameFeed = ({feed=[], sendMessage, userSelected, selectUserName}) => { 
  return (
    <div className="game-feed">
    <p>Open TableTop RPG</p>
    <ul className="feed-list">
      {feed.map((feedItem, i) => <FeedItem key={i} feedItem={feedItem}/>)}
    </ul>
    {userSelected ? 
      <FeedForm sendMessage={sendMessage}/> : 
      <UsernameForm selectUserName={selectUserName}/>}
    </div>
  );
}