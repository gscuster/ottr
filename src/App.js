import './App.css';
import React from 'react';
import {Canvas} from './components/Canvas';
import {GameFeed} from './components/GameFeed';
import io from 'socket.io-client';

const socket = io("192.168.0.191:4000");

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      connected: socket.connected,
      feed: ['Welcome to OTTR']
    };
    this.addFeedItem = this.addFeedItem.bind(this)
  }

  addFeedItem(item) {
    const feed = [ ...this.state.feed, item ];
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
    this.setState({
      connected: socket.connected
    });
  }

  render () {
    const { addFeedItem } = this;
    const { feed } = this.state;
    return (
      <div className="App">
        <Canvas/>
        <GameFeed socket={socket} feed={feed} onSubmit={ addFeedItem }/>
      </div>
    );
  }
}
