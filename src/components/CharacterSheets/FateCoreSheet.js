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
  '12': 'Absurdly High',
  '21': 'Accident',
  '4-1': 'Stupid accident'
}

export const FateCoreSheet = ({ rollDice, character, setCharacterData, canEdit,
  editActive, setEditActive}) => {
  const {name, description, aspects, skills, stunts} = character;
  const sortedSkills = Object.keys(skillLadder).reverse().map( (key) => {
    return skills.filter(skill => skill.rating === key)
  })

  const skillInput = (e) => {
    const change = e.target.value > 0 ? 1 : -1;
    const skillName = e.target.getAttribute('skillname');
    const skillRating = e.target.getAttribute('skillrating');
    const updatedSkill = {
      name: skillName, 
      rating: String(parseInt(skillRating) + change)
    };
    console.log(updatedSkill);
    const updatedSkills = character.skills.map( (oldSkill) => 
      oldSkill.name === skillName ? updatedSkill : oldSkill);
    const updatedCharacter = {...character, skills: updatedSkills};
    console.log(updatedCharacter);
    setCharacterData(updatedCharacter);
  }
  
  const updateTextField = (e) => {
    const field = e.target.getAttribute('field');
    const updatedCharacter = {...character, [field]: e.target.value }
    setCharacterData(updatedCharacter);
  }

  return (
    <div className='character'>
      {editActive &&
        <input type='text' className='character-text-input' value={character.name}
          field="name" onChange={updateTextField}/>}
      {editActive ?
        <textarea onChange={updateTextField} className="character-description" 
          rows="4" field="description" value={description}></textarea> : 
        <p>{description}</p>}
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
                  <td key={j}>
                    <div>
                      <DiceButton character={name} name={skill.name} 
                        rating={skill.rating} rollDice={rollDice}/>
                      {skill.name}
                      {editActive && 
                        <input className='skill-number' type='number' value='0' 
                          skillname={skill.name} skillrating={skill.rating} 
                          onInput={skillInput}/>}
                    </div>
                  </td>
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