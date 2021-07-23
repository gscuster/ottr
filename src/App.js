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
      userSelected: false
    };
    this.addFeedItem = this.addFeedItem.bind(this);
    this.onUserSelected = this.onUserSelected.bind(this);
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
    Socket.Socket.on('userSelected', (userSelected) => this.onUserSelected(userSelected));
    Socket.Socket.on('message', (content) =>this.addFeedItem(content));
    Socket.setup();
  }

  componentWillUnmount() {
    Socket.teardown();
  }

  onUserSelected(userSelected) {
    this.setState({userSelected});
  }

  render () {
    const { feed, userSelected} = this.state;
    return (
      <div className="App">
        <Canvas/>
        <GameFeed sendMessage={Socket.sendMessage} feed={feed} 
          userSelected={userSelected} selectUserName={Socket.selectUserName}/>
      </div>
    );
  }
}
