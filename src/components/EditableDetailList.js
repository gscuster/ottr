import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import './EditableDetailList.css';

export const EditableDetailList = ({items, itemType, updateItem, 
  removeItem, addItem, editActive=false}) => (
  <div>
    <List>
      {items.map( (item, index) => (
        <ListItem key={index} className='edl-list-item'>
          <ListItemText
            className='edl-list'
            primary={
              <div>
                <TextField
                  variant='standard'
                  value={item.name}
                  onChange={(e) => updateItem(e, index, itemType)}
                  inputProps = {{field: "name"}}
                  InputProps = {{
                    readOnly: !editActive, 
                    disableUnderline: true,
                    classes: {
                      input: 'edl-list-primary'
                    }
                  }}
                  className="edl-list"
                />
                {editActive &&
                  <IconButton aria-label='delete' 
                    onClick={(e) => removeItem(index, itemType)}>
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
                value={item.description}
                onChange={(e) => updateItem(e, index, itemType)}
                fullWidth={true}
                inputProps = {{field: "description"}}
                InputProps = {{readOnly: !editActive}}
                className="edl-list"
              />
            }
          />
        </ListItem>
      ))}
    </List>
    {editActive && 
      <IconButton aria-label="add" color="success" 
      onClick={() => addItem(itemType)}>
        <AddIcon/>
      </IconButton>
    }
  </div>
)