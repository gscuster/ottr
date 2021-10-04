import './FeedForm.css'
import React, { useState } from "react";
import { DiceButton } from './DiceButton';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

/**
 * React component. Form with text, a button to send the text, and a dice button.
 * @param {*} param0 
 * @returns 
 */
export const FeedForm = ({sendMessage, rollDice}) => {
  const [message, setMessage] = useState("");
  const [diceModifier, setDiceModifier] = useState(0);
  
  const handleDiceModifier = (e) => {
    setDiceModifier(e.target.value);
  }

  const handleSubmit = (e) => {
      e.preventDefault();
      if (message) {
        sendMessage(message);
        setMessage('');
      }
  }

  return (
    <form className="feed-form" onSubmit={handleSubmit}>
      <DiceButton id='feed-dice' rating={diceModifier} rollDice={rollDice} 
        height='32' width='32'/>
      <Select
        className="feed-dice-modifier"
        variant="standard"
        value={diceModifier} 
        onChange={handleDiceModifier}
        autoWidth
        disableUnderline
      >
        <MenuItem value={-1}>-1</MenuItem>
        <MenuItem value={0}>+0</MenuItem>
        <MenuItem value={1}>+1</MenuItem>
        <MenuItem value={2}>+2</MenuItem>
        <MenuItem value={3}>+3</MenuItem>
        <MenuItem value={4}>+4</MenuItem>
        <MenuItem value={5}>+5</MenuItem>
        <MenuItem value={6}>+6</MenuItem>
      </Select>
      <input type="text" 
        className="feed-input"
        autoComplete="off"
        value={message}
        onChange={e => setMessage(e.target.value)}/>
      <button className='feed-button'>Send</button>
    </form>
  )
}