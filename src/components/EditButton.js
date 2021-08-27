import './EditButton.css'

export const EditButton = ({width, height, onClick, icon}) => {
    return <img className='editButton' src={icon} width={width} height={height}
        alt="Edit" onClick={onClick}/>
}