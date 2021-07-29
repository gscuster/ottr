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
      username: null
    };
    this.addFeedItem = this.addFeedItem.bind(this);
    this.onUserSelected = this.onUserSelected.bind(this);
    this.onConnected = this.onConnected.bind(this);
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
    Socket.Socket.on('connectedAs', (username) => this.onConnected(username));
    Socket.setup();
  }

  componentWillUnmount() {
    Socket.teardown();
  }

  onConnected(username) {
    this.setState({username});
  }

  onUserSelected(userSelected) {
    this.setState({userSelected});
  }

  render () {
    const { feed, userSelected, username} = this.state;
    return (
      <div className="App">
        <Canvas/>
        <GameFeed sendMessage={Socket.sendMessage} feed={feed} 
          userSelected={userSelected} selectUserName={Socket.selectUserName} username={username}/>
      </div>
    );
  }
}
