import React, { useState } from "react";
import { DiceButton } from './DiceButton';

export const FeedForm = ({sendMessage, rollDice}) => {
  const [message, setMessage] = useState("");
  
  const handleSubmit = (e) => {
      e.preventDefault();
      if (message) {
        sendMessage(message);
        setMessage('');
      }
  }

  return (
    <form className="feed-form" onSubmit={handleSubmit}>
      <DiceButton id='feed-dice' rating={0} rollDice={rollDice} height='32' width='32'/>
      <input type="text" 
        className="feed-input"
        autoComplete="off"
        value={message}
        onChange={e => setMessage(e.target.value)}/>
      <button className='send-button'>Send</button>
    </form>
  )
}