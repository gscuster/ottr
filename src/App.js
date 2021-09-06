import './App.css';
import React from 'react';
import { TabWindow } from './components/TabWindow';
import { GameFeed } from './components/GameFeed';
import { GameSelector } from './components/GameSelector';
import { LoadingPage } from './components/LoadingPage';
import * as Socket from './client/Socket'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editUserActive: false,
      feed: [],
      gameState: {gameActive: null, gameList: [], gameData: null, activeUsers: []},
      gm: false,
      waitingOnResponse: false,
      userID: null,
      username: null,
      connectionStatus: 'no username'
    };
    this.addFeedItem = this.addFeedItem.bind(this);
    this.onConnected = this.onConnected.bind(this);
    this.replaceFeed = this.replaceFeed.bind(this);
    this.setEditUserActive = this.setEditUserActive.bind(this);
    this.setConnectionStatus = this.setConnectionStatus.bind(this);
    this.setGameState = this.setGameState.bind(this);
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
    Socket.Socket.on('connectedAs', (username, userID, connectionStatus) => 
      this.onConnected(username, userID, connectionStatus));
    Socket.Socket.on('gameState', (gameState) => this.setGameState(gameState));
    Socket.Socket.on('feed', (feed) => this.replaceFeed(feed));
    Socket.Socket.on('setConnectionStatus', (connectionStatus => 
      this.setConnectionStatus(connectionStatus)))
    Socket.setup();
  }

  componentWillUnmount() {
    Socket.teardown();
  }

  onConnected(username, userID, connectionStatus) {
    console.log(`Status is ${connectionStatus} with ${username} and id ${userID}`);
    this.setState({username, userID, connectionStatus});
  }

  replaceFeed(feed) {
    this.setState({feed});
  }

  setConnectionStatus(connectionStatus) {
    console.log(connectionStatus);
    this.setState({connectionStatus});
  }

  setGameState(gameState) {
    this.setState({gameState, waitingOnResponse: false});
    if (gameState.gameActive != null) {
      const connectionStatus = 'connected';
      this.setState({connectionStatus});
    }
    console.log(gameState);
    console.log(this.state.userID);
    if (gameState.gameData != null && 
      gameState.gameData.gm.includes(this.state.userID)) {
      const gm = true;
      this.setState({gm});
    }
  }

  setEditUserActive(editUserActive) {
    this.setState({editUserActive});
    return false;
  }

  render () {
    const { feed, connectionStatus, username, editUserActive, userID, 
      gameState, waitingOnResponse, gm} = this.state;
    const { setEditUserActive } = this;
    console.log(`We are the gm: ${gm}`);
    return (
      <div className="App">
        {
          connectionStatus !== 'connected' ?
            <LoadingPage connectionStatus={connectionStatus} 
              selectUserName={Socket.selectUserName}/> :
            (gameState.gameActive != null ?
            [<TabWindow key='tabwindow1' gameData={gameState.gameData ?? {}} 
              rollDice={Socket.rollDice} gameName={gameState.gameActive}
              users={gameState.activeUsers} gm={gm}/>,
            <GameFeed sendMessage={Socket.sendMessage} feed={feed} 
              username={username} editUserActive={editUserActive}
              setEditUserActive={setEditUserActive} editUserName={Socket.editUserName}
              rollDice={Socket.rollDice} userID={userID} key='gamefeed1'/>] :
            <GameSelector gameList={gameState.gameList}
              selectGame={Socket.selectGame} waiting={waitingOnResponse}/>)
        }
        
      </div>
    );
  }
}
