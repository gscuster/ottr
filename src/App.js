import './App.css';
import React from 'react';
import {Canvas} from './components/Canvas';
import {GameFeed} from './components/GameFeed';
import io from 'socket.io-client';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '192.168.0.4:4000',
      socket: null,
      feed: ['Welcome to OTTR'],
      userSelected: false
    };
    this.addFeedItem = this.addFeedItem.bind(this);
    this.state.socket = io(this.state.address);
  }

  addFeedItem(item) {
    const feed = [ ...this.state.feed, item ];
    this.setState({feed})
  }

  componentDidMount() {
    this.state.socket.on('connect', () => this.onConnectionStateUpdate());
    this.state.socket.on('disconnect', () => this.onConnectionStateUpdate());
    this.state.socket.on('message', (content) => this.onMessage(content));
  }

  componentWillUnmount() {
    this.state.socket.off('connect');
    this.state.socket.off('disconnect');
    this.state.socket.off('message');
  }

  onConnectionStateUpdate() {
  }

  onMessage(content) {
    console.log(`Message received:${content}`);
    this.addFeedItem(content);
  }

  render () {
    const { feed, socket, userSelected } = this.state;
    return (
      <div className="App">
        <Canvas/>
        <GameFeed socket={socket} feed={feed} userSelected={userSelected}/>
      </div>
    );
  }
}
