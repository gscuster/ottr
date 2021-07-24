import './FeedItem.css'

export const FeedItem = ({feedItem}) => {
  return <li className="feed-item"><em>{feedItem.username}</em>: {getFeedMessage(feedItem)}</li>
};

const getFeedMessage = (feedItem) => {
  switch (feedItem.type) {
    case 'roll':
      return feedItem.roll.output;
    default:
      return feedItem.message;
  }
}