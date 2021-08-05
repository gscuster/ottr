import EditIcon from '../res/edit.svg';

export const EditButton = ({width, height, onClick}) => {
    return <img src={EditIcon} width={width} height={height}
        alt="Edit" onClick={onClick}/>
}