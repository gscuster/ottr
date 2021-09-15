import './EditButton.css'

/**
 * React component. Button with icon. Not really edit specific so I should
 * update this at some point. Could probably combine this with DiceButton.
 * @param {*} param0 
 * @returns 
 */
export const EditButton = ({width, height, onClick, icon}) => 
(
  <button className='edit-button' onClick={onClick} type='button' alt="Edit">
    <img className='edit-button-icon user-input' src={icon} width={width} height={height}
      alt="Edit" onClick={onClick}/>
  </button>
)