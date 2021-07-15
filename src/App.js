import './App.css';

function App() {
  return (
    <div className="App">
      <AppCanvas/>
      <GameFeed/>
    </div>
  );
}

function AppCanvas() {
  return (
    <canvas className="App-canvas"/>
  );
}

function GameFeed() {
  return (
    <div className="App-game-feed">
        <p>Open TableTop RPG</p>
        <ul/>
        <form id="feed-form" action="">
          <input id="feed-input" autocomplete="off" /><button>Send</button>
        </form>
    </div>
  )
}

export default App;
