import DiceIcon from '../res/mdi/dice-6-outline.svg';
import './DiceButton.css';

/**
 * React component. Returns a dice button that triggers rollDice onclick.
 * The attributes skill, rating, and character are applied to the button.
 * @param {*} param0 
 * @returns 
 */
export const DiceButton = ({name: skill='default', rating=0, rollDice, height='24', width='24', id=null, character=''}) => (
  <button type='button' className='dice-button' alt={`Roll 4dF for ${skill} with modifier ${rating}`} 
    onClick={rollDice} rating={rating} skill={skill} id={id} character={character}>
    <img className='dice' src={DiceIcon} height={height} width={width} alt={`Roll 4dF for ${skill} with modifier ${rating}`} 
      rating={rating} skill={skill} character={character}/>
  </button>
  
)