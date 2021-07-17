import './App.css';
import {Canvas} from './components/Canvas';
import {GameFeed} from './components/GameFeed';

function App() {
  return (
    <div className="App">
      <Canvas/>
      <GameFeed/>
    </div>
  );
}

export default App;
