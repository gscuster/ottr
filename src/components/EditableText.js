import './EditableText.css';

/**
 * React component. Returns text that is editable when editActive is true and
 * not editable when editActive is false.
 * @param {*} param0 
 * @returns 
 */
export const EditableText = ({inputText, size="12", editActive=true, setValue}) => {
  return (
    editActive ? 
    <input  className='user-input' display="inline" type="text" defaultValue={inputText} 
      size={size} width="auto" onChange={e => setValue(e.target.value)}/> :
    <p className="edit-inactive user-input">{inputText}</p> 
  );
}