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
      item.username + ': ' + item.message
    ];
    this.setState({feed})
  }

  componentDidMount() {
    socket.on('connect', () => this.onConnectionStateUpdate());
    socket.on('disconnect', () => this.onConnectionStateUpdate());
    socket.on('message', (content) => this.onMessage(content));
  }

  componentWillUnmount() {
    socket.off('connect');
    socket.off('disconnect');
    socket.off('message');
  }

  onConnectionStateUpdate() {
  }

  onMessage(content) {
    console.log(content.message);
    console.log(`Message received:${content}`);
    this.addFeedItem(content);
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
