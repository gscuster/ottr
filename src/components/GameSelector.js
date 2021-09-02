import './GameSelector.css';
import React, { useState } from "react";

export const GameSelector = ({gameList=[], selectGame, waiting=false}) => {
  const initSelected = gameList.length === 0;
  const [newGameSelected, setNewGameSelected] = useState(initSelected);
  const [gameName, setGameName] = useState('game');

  const onChangeSelector = (e) => {
    setGameName(e.target.value);
    e.target.value === 'newgame' ? setNewGameSelected(true) : setNewGameSelected(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newGameSelected) {
      // Submit input name
      selectGame(gameName);
    }
    else {
      // Submit value from selector
      selectGame(e.target[0].value);
    }
  }

  return (
    <div className='game-selector'>
      <h2>Select or create a game</h2>
      <form onSubmit={handleSubmit}>
        <select onChange={onChangeSelector}>
          {gameList.map( (game, key) => (
            <option key={key} value={game}>{game}</option>
          ))}
          <option value='newgame' key='newgame'>&lt;New Game&gt;</option>
        </select>
        {newGameSelected && 
          <input type='text' className='new-game-input' defaultValue='game' 
            onChange={e => setGameName(e.target.value)} size='12'/>}
        <button className='selector-button' disabled={waiting}>Select Game</button>
      </form>
    </div>
    
  )
}

