import { DiceButton } from '../DiceButton';

const skillLadder = {
  '-2': 'Terrible',
  '-1': 'Poor',
  '0': 'Mediocre',
  '1': 'Average',
  '2': 'Fair',
  '3': 'Good',
  '4': 'Great',
  '5': 'Superb',
  '6': 'Fantastic',
  '7': 'Epic',
  '8': 'Legendary',
  '12': 'Absurdly High'
}

export const FateCoreSheet = ({ rollDice, character: {name, description, aspects, skills, stunts}}) => {
  const sortedSkills = Object.keys(skillLadder).reverse().map( (key) => {
    return skills.filter(skill => skill.rating === key)
  })
  return (
    <div className='character'>
      <p>{description}</p>
      <table>
        <thead>
          <tr>
            <th>Aspect</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {aspects.map( (aspect, index) => 
            {return (
            <tr key={index}>
              <td>{aspect.name}</td>
              <td>{aspect.description}</td>
            </tr>
            )}           
          )}
        </tbody>
        
        
      </table>

      <table>
        <thead>
          <tr>
            <th>Rating</th>
            <th>Skill(s)</th>
          </tr>
        </thead>
        <tbody>
          {sortedSkills
            .filter( level => level.length > 0 )
            .map( (level, i) => (
              <tr key={i}>
                <td>{skillLadder[level[0].rating]}</td>
                {level.map( (skill, j) => (
                  <td key={j}><DiceButton character={name} name={skill.name} rating={skill.rating} rollDice={rollDice}/> {skill.name} </td>
                ))}
              </tr>
            ))}
        </tbody>
        
      </table>

      <h3>Stunts</h3>
      <dl>
        {stunts.map( (stunt, index) => ([
          <dt key={2*index}>{stunt.name}</dt>,
          <dd key={2*index + 1}>{stunt.description}</dd>
        ]))}
      </dl>
    </div>
  );
}