import {FeedItem} from './FeedItem.js';
import React from 'react';

/**
 * React component. List of feed items.
 */
export default class FeedList extends React.Component {
  constructor(props) {
    super(props);
    this.listRef = React.createRef();
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    // If items get added to the list, determine whether user has scrolled up
    if (prevProps.feed.length < this.props.feed.length) {
      const list = this.listRef.current;
      const epsilon = 20;
      return (list.scrollHeight - list.scrollTop > list.clientHeight + epsilon);
    }
    return null;
  }

  componentDidMount() {
    // Scroll to bottom of list
    const list = this.listRef.current;
    list.scrollTo({behavior: "smooth"},list.scrollHeight - list.clientHeight);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // If we had a change and the user had not scrolled up
    if (snapshot !== null && !snapshot) {
      const list = this.listRef.current;
      list.scrollTo({behavior: "smooth"},list.scrollHeight - list.clientHeight);
    }
  }

  render() {
    const {feed, divClass, listClass} = this.props;
    return (
      <div className={divClass} ref={this.listRef}>
        <ul className={listClass}>
          {feed.map((feedItem, i) => 
            <FeedItem key={i} feedItem={feedItem} prev={feed[i-1]} next={feed[i+1]}/>)}
        </ul>
      </div>
    );
  }
}