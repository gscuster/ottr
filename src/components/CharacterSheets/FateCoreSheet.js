import { DiceButton } from '../DiceButton';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid } from '@mui/x-data-grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

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
  editActive, setEditActive, saveCharacterData, gm=false, userID}) => {
  const {name, description, aspects, skills, stunts, extras, notes, gmNotes} = character;
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
    saveCharacterData(updatedCharacter);
  }
  
  // Sets character data with updated field
  const updateTextField = (e) => {
    const field = e.target.getAttribute('field');
    const updatedCharacter = {...character, [field]: e.target.value }
    console.log(`Updating ${field} with ${e.target.value}`)
    saveCharacterData(updatedCharacter);
  }

  // Sets character data with updated field and calls saveCharacterData with
  // the updated character data.
  const saveTextField = (e) => {
    const field = e.target.getAttribute('field');
    const updatedCharacter = {...character, [field]: e.target.value }
    saveCharacterData(updatedCharacter);
  }

  const addTableField = (field) => {
    const updatedField = [...character[field], {name: '', description: ''}]
    const updatedCharacter = {...character, [field]: updatedField}
    saveCharacterData(updatedCharacter)
  }

  const updateTableField = (e, field) => {
    const rowIndex = e.id
    const updatedField = character[field].map((element, index) => (
      index === rowIndex ? {...element, [e.field]: e.value} : element
    ))
    const updatedCharacter = {...character, [field]: updatedField}
    saveCharacterData(updatedCharacter)
  }

  const updateTableFieldIndex = (e, rowIndex, field) => {
    const subfield = e.target.getAttribute('field');
    const updatedField = character[field].map((element, index) => (
      index === rowIndex ? {...element, [subfield]: e.target.value} : element
    ))
    const updatedCharacter = {...character, [field]: updatedField}
    saveCharacterData(updatedCharacter)
  }

  const removeTableField = (rowIndex, field) => {
    if (rowIndex != null) {
      const updatedField = character[field].filter((element, index) => (
        index !== rowIndex
      ))
      const updatedCharacter = {...character, [field]: updatedField}
      // Using setTimeout as MUI will try to remove focus for the cell and will
      // raise an error if it has already been deleted.
      setTimeout(() => saveCharacterData(updatedCharacter))
    }
  }

  const addSkill = () => {
    const updatedSkills = [...character['skills'], {name: 'Default Skill', rating: '1'}]
    const updatedCharacter = {...character, ['skills']: updatedSkills}
    saveCharacterData(updatedCharacter)
  }

  const extrasWithID = extras.map((extra, index) => {
    return {...extra, id: index}
  })

  const extrasColumns = [
    {field: 'name', headerName: 'Extra', width: 240, editable: editActive},
    {field: 'description', headerName: 'Description', width: 240, flex: 1,
      sortable: false, editable: editActive},
    {field: 'id', headerName: 'Delete', width: 80, hide: !editActive,
      renderCell: (params) => (
        <IconButton aria-label='delete'
          onClick={(e) => removeTableField(params.id ?? null, 'extras')}>
          <DeleteIcon/>
        </IconButton>
      )
    }
  ]

  const aspectsWithID = aspects.map((extra, index) => {
    return {...extra, id: index}
  })

  const aspectsColumns = [
    {field: 'name', headerName: 'Aspect', width: 240, editable: editActive},
    {field: 'description', headerName: 'Description', width: 240, flex: 1,
      sortable: false, editable: editActive}
  ]

  const skillsColumns = [{field: 'name', headerName: 'Rating'},
                         {field: 'skill', headerName: 'Skill'}]

  return (
    <div className='character'>
      <TextField
        variant='standard'
        label="Name"
        value={name}
        onChange={updateTextField}
        inputProps = {{field: "name"}}
        InputProps = {{
          readOnly: !editActive,
          disableUnderline: true && !editActive}}
        className="character-text"
      />
      <TextField
        label="Description"
        multiline
        maxRows={4}
        value={description}
        onChange={updateTextField}
        fullWidth={true}
        inputProps = {{field: "description"}}
        InputProps = {{readOnly: !editActive}}
        className="character-text"
      />
      {canEdit ?
        <p>Fate Points:<input type='number' className='character-num-input' 
          value={character.fatePoints} field="fatePoints" 
          onChange={saveTextField}/> Refresh: <input type='number' className='character-num-input' 
          value={character.refresh} field="refresh" 
          onChange={saveTextField}/></p> :
        <p>Fate Points: {character.fatePoints} Refresh: {character.refresh}</p>}
      
      <h3>Aspects</h3>
      <DataGrid
        rows={aspectsWithID}
        columns={aspectsColumns}
        hideFooter={true}
        autoHeight
        id='Aspects'
        disableSelectionOnClick
        onCellEditCommit={(e) => updateTableField(e, 'aspects')}
      />

      <h3>Skills</h3>
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
                      {gm &&
                        <input type='number' className='character-num-input-transparent' 
                          value={0}
                          skillName={skill.name}
                          skillRating={skill.rating}
                          onChange={skillInput}/>}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
      {gm && 
        <IconButton aria-label="add" color="success" 
        onClick={addSkill}>
          <AddIcon/>
        </IconButton>}

      <h3 className='character-header'>Stunts</h3>
      <List>
        {stunts.map( (stunt, index) => (
          <ListItem key={index} className='character-list-item'>
            <ListItemText
              className='character-list'
              primary={
                <div>
                  <TextField
                    variant='standard'
                    value={stunt.name}
                    onChange={(e) => updateTableFieldIndex(e, index, 'stunts')}
                    inputProps = {{field: "name"}}
                    InputProps = {{
                      readOnly: !editActive, 
                      disableUnderline: true,
                      classes: {
                        input: 'character-list-primary'
                      }
                    }}
                    className="character-list"
                  />
                  {editActive &&
                    <IconButton aria-label='delete' 
                      onClick={(e) => removeTableField(index, 'stunts')}>
                      <DeleteIcon/>
                    </IconButton>
                  }
                </div>
              }
              secondary={
                <TextField
                  variant='standard'
                  multiline
                  maxRows={6}
                  value={stunt.description}
                  onChange={(e) => updateTableFieldIndex(e, index, 'stunts')}
                  fullWidth={true}
                  inputProps = {{field: "description"}}
                  InputProps = {{readOnly: !editActive}}
                  className="character-list"
                />
              }
            />
          </ListItem>
        ))}
      </List>
      {editActive && 
        <IconButton aria-label="add" color="success" 
        onClick={() => addTableField('stunts')}>
          <AddIcon/>
        </IconButton>
      }

      <h3>Extras</h3>
      <DataGrid
        rows={extrasWithID}
        columns={extrasColumns}
        hideFooter={true}
        autoHeight
        id='Extras'
        disableSelectionOnClick
        onCellEditCommit={(e) => updateTableField(e, 'extras')}
      />
      {editActive && 
        <IconButton aria-label="add" color="success" 
        onClick={() => addTableField('extras')}>
          <AddIcon/>
        </IconButton>}
      {gm &&
         <TextField
         label="GM Notes"
         multiline
         maxRows={4}
         value={gmNotes}
         onBlur={updateTextField}
         fullWidth={true}
         inputProps = {{field: "gmNotes"}}
         InputProps = {{readOnly: !editActive}}
         className="character-text"/>}
    </div>
  );
}