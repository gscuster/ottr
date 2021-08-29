import React, { useState } from "react";
import { DiceButton } from './DiceButton';

/**
 * React component. Form with text, a button to send the text, and a dice button.
 * @param {*} param0 
 * @returns 
 */
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
      <button className='feed-button'>Send</button>
    </form>
  )
}