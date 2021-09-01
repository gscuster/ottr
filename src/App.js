import './App.css';
import React from 'react';
import { TabWindow } from './components/TabWindow';
import { GameFeed } from './components/GameFeed';
import { GameSelector } from './components/GameSelector';
import * as Socket from './client/Socket'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editUserActive: false,
      feed: [],
      gameSelected: true,
      userID: null,
      username: null,
      userSelected: false
    };
    this.addFeedItem = this.addFeedItem.bind(this);
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
    Socket.Socket.on('message', (content) => this.addFeedItem(content));
    Socket.Socket.on('connectedAs', (username, userID, userSelected) => 
      this.onConnected(username, userID, userSelected));
    Socket.Socket.on('feed', (feed) => this.replaceFeed(feed));
    Socket.setup();
  }

  componentWillUnmount() {
    Socket.teardown();
  }

  onConnected(username, userID, userSelected) {
    console.log(`We connected as ${username} with id ${userID}: ${userSelected}`);
    this.setState({username, userID, userSelected});
  }

  replaceFeed(feed) {
    this.setState({feed});
  }

  setEditUserActive = (editUserActive) => {
    this.setState({editUserActive});
    return false;
  }

  render () {
    const { feed, userSelected, username, editUserActive, userID, 
      gameSelected} = this.state;
    const { setEditUserActive } = this;
    return (
      <div className="App">
        {
          gameSelected != null ?
            [<TabWindow key='tabwindow1'/>,
            <GameFeed sendMessage={Socket.sendMessage} feed={feed} 
              userSelected={userSelected} selectUserName={Socket.selectUserName} 
              username={username} editUserActive={editUserActive}
              setEditUserActive={setEditUserActive} editUserName={Socket.editUserName}
              rollDice={Socket.rollDice} userID={userID} key='gamefeed1'/>] :
            <GameSelector gameList={['gameA', 'gameB', 'gameC']}
              selectGame={Socket.selectGame}/>
        }
        
      </div>
    );
  }
}
