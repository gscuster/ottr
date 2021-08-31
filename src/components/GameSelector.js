import './GameSelector.css';
import React, { useState } from "react";

export const GameSelector = ({gameList=[]}) => {
  const [newGameSelected, setNewGameSelected] = useState(false);
  const [gameName, setGameName] = useState('game');

  const onChangeSelector = (e) => {
    e.target.value === 'newgame' ? setNewGameSelected(true) : setNewGameSelected(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <div className='game-selector'>
      <h2>Select or create a game</h2>
      <form onSubmit={handleSubmit}>
        <select onChange={onChangeSelector}>
          {gameList.map( (game, key) => (
            <option key={key} value={game}>{game}</option>
          ))}
          <option value='newgame'>&lt;New Game&gt;</option>
        </select>
        {newGameSelected && 
          <input type='text' className='new-game-input' defaultValue='game' 
            onChange={e => setGameName(e.target.value)} size='12'/>}
        <button type='button' className='selector-button'>Select Game</button>
      </form>
    </div>
    
  )
}

