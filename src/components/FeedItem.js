import './FeedItem.css'

export const FeedItem = ({feedItem}) => {
  return <li className="feed-item"><em>{feedItem.username}</em>: {feedItem.message}</li>
};