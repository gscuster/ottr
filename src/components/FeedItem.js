import './FeedItem.css'

/**
 * React component. Formats a list item based on the supplied feedItem and
 * the surrounding items.
 * @param {*} param0 
 * @returns 
 */
export const FeedItem = ({feedItem, prev, next, currentUser=false}) => {
  return <li className={getFeedClass(feedItem, prev, next, currentUser)}><em>{feedItem.username}</em>: {getFeedMessage(feedItem)}</li>
};

const checkMatch = (item1, item2) => {
  if (item1.username === item2.username && item1.userID === item2.userID) {
    return true;
  } else {
    return false;
  }
}

const getFeedClass = (feedItem, prev, next, currentUser) => {
  const userClass = currentUser ? '-user' : '';
  if (prev && checkMatch(feedItem, prev)) {
    if (next && checkMatch(feedItem, next)) {
      return "feed-item" + userClass + " middle";
    } else {
      return "feed-item" + userClass + " last";
    }
  } else if (next && checkMatch(feedItem, next)) {
    return "feed-item" + userClass + " first";
  }
  else {
    return "feed-item" + userClass;
  }
}

const getFeedMessage = (feedItem) => {
  switch (feedItem.type) {
    case 'roll':
      const rollText = feedItem.character != null ?
          (feedItem.skill != null ? 
          `${feedItem.character} rolled for ${feedItem.skill}. ` : '') :
        feedItem.skill != null ? 
          `Rolled for ${feedItem.skill}. ` : '';
          
      return rollText + feedItem.roll.output;
    default:
      return feedItem.message;
  }
}