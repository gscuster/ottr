import './App.css';
import React from 'react';
import {Canvas} from './components/Canvas';
import {GameFeed} from './components/GameFeed';
import * as Socket from './client/Socket'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feed: [],
      userSelected: false,
      username: null,
      userID: null,
      editUserActive: false
    };
    this.addFeedItem = this.addFeedItem.bind(this);
    this.onUserSelected = this.onUserSelected.bind(this);
    this.onConnected = this.onConnected.bind(this);
    this.replaceFeed = this.replaceFeed.bind(this);
    this.setEditUserActive = this.setEditUserActive.bind(this);
  }

  addFeedItem(item) {
    const feed = [ 
      ...this.state.feed,
      {...item}
    ];
    this.setState({feed})
  }

  componentDidMount() {
    Socket.Socket.on('userSelected', (userSelected) => this.onUserSelected(userSelected));
    Socket.Socket.on('message', (content) => this.addFeedItem(content));
    Socket.Socket.on('connectedAs', (username, userID) => this.onConnected(username, userID));
    Socket.Socket.on('feed', (feed) => this.replaceFeed(feed));
    Socket.setup();
  }

  componentWillUnmount() {
    Socket.teardown();
  }

  onConnected(username, userID) {
    this.setState({username, userID});
  }

  onUserSelected(userSelected) {
    this.setState({userSelected});
  }

  replaceFeed(feed) {
    this.setState({feed});
  }

  setEditUserActive = (editUserActive) => {
    this.setState({editUserActive});
    return false;
  }

  render () {
    const { feed, userSelected, username, editUserActive, userID} = this.state;
    const { setEditUserActive } = this;
    return (
      <div className="App">
        <Canvas/>
        <GameFeed sendMessage={Socket.sendMessage} feed={feed} 
          userSelected={userSelected} selectUserName={Socket.selectUserName} 
          username={username} editUserActive={editUserActive}
          setEditUserActive={setEditUserActive} editUserName={Socket.editUserName}
          rollDice={Socket.rollDice} userID={userID}/>
      </div>
    );
  }
}
