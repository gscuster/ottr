import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Clear';
import './TabCloseButton.css'

/**
 * React component. Close button for tabs
 */
export const TabCloseButton = ({id, onClick}) => 
(
  <IconButton aria-label='close tab'
    id={id}
    onClick={onClick}
    size='small'
    className='close-button'>
    <CloseIcon id={id} sx={{ fontSize: 14 }} onClick={onClick}/>
  </IconButton>
)