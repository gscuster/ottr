import './App.css';
import React from 'react';
import {Canvas} from './components/Canvas';
import {GameFeed} from './components/GameFeed';
import io from 'socket.io-client';

const address = '192.168.0.4:4000';
const socket = io(address, {autoConnect: false});

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: null,
      feed: [],
      userSelected: false
    };
    this.addFeedItem = this.addFeedItem.bind(this);
    this.selectUserName = this.selectUserName.bind(this);
  }

  addFeedItem(item) {
    const feed = [ 
      ...this.state.feed,
      {
        username: item.username,
        message: item.message
      }
    ];
    this.setState({feed})
  }

  componentDidMount() {
    socket.on('connect', () => this.onConnectionStateUpdate());
    socket.on('disconnect', () => this.onConnectionStateUpdate());
    socket.on('message', (content) => this.onMessage(content));
    socket.on('session', ({sessionID, userID}) => this.onSession(sessionID, userID));
    socket.on('connect_error', (err) => this.onConnectionError(err));

    const sessionID = localStorage.getItem("sessionID");

    if (sessionID) {
      socket.auth = { sessionID };
      socket.connect();
      const userSelected = true;
      this.setState({userSelected});
    }
  }

  componentWillUnmount() {
    socket.off('connect');
    socket.off('disconnect');
    socket.off('message');
    socket.off('session');
    socket.off('connect_error');
  }

  onConnectionError(err) {
    if (err.message === "invalid username") {
      const userSelected = false;
      this.setState({userSelected});
    }
  }

  onConnectionStateUpdate() {
  }

  onMessage(content) {
    this.addFeedItem(content);
  }

  onSession(sessionID, userID) {
    socket.auth = { sessionID };
    // store it in the localStorage
    localStorage.setItem("sessionID", sessionID);
    // save the ID of the user
    socket.userID = userID;
  }

  selectUserName(username) {
    if (username) {
      socket.auth = { username };
      socket.connect();
      const userSelected = true;
      this.setState({userSelected});
    }
  }

  render () {
    const { selectUserName } = this;
    const { feed, userSelected} = this.state;
    return (
      <div className="App">
        <Canvas/>
        <GameFeed socket={socket} feed={feed} userSelected={userSelected} selectUserName={selectUserName}/>
      </div>
    );
  }
}
