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
      connected: socket.connected
    };
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
    return (
      <div className="App">
        <Canvas/>
        <GameFeed socket={socket}/>
      </div>
    );
  }
}
