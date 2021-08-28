import DiceIcon from '../res/mdi/dice-6-outline.svg';
import './DiceButton.css';

export const DiceButton = ({name='default', rating, rollDice, height='24', width='24', id=null, character=''}) => (
  <img className='dice' alt={`Roll 4dF for ${name} with modifier ${rating}`} 
    src={DiceIcon} height={height} width={width} 
    onClick={rollDice} rating={rating} skill={name} id={id} character={character}/>
)