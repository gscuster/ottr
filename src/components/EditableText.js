import './EditableText.css';

export const EditableText = ({inputText, size="12", editActive=true, setValue}) => {
  return (
    editActive ? 
    <input display="inline" type="text" defaultValue={inputText} 
      size={size} width="auto" onChange={e => setValue(e.target.value)}/> :
    <p className="edit-inactive">{inputText}</p> 
  );
}