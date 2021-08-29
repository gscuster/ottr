import DiceIcon from '../res/mdi/dice-6-outline.svg';
import './DiceButton.css';

export const DiceButton = ({name='default', rating=0, rollDice, height='24', width='24', id=null, character=''}) => (
  <button type='button' className='dice-button' alt={`Roll 4dF for ${name} with modifier ${rating}`} 
    onClick={rollDice} rating={rating} skill={name} id={id} character={character}>
    <img className='dice' src={DiceIcon} height={height} width={width} alt={`Roll 4dF for ${name} with modifier ${rating}`} 
      rating={rating} skill={name} character={character}/>
  </button>
  
)