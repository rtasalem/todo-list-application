import IconBar from './IconBar';
import { BsImage, BsPlayCircle, BsCheckSquare } from 'react-icons/bs';
import TrashIcon from './TrashIcon';
import EditIcon from './EditIcon';

const TodoListIconBar = ({ editItem, deleteItem }) => {
    const iconArray = [BsImage, BsPlayCircle, BsCheckSquare];

    return (
        <div className="icon-bar-container">
            <IconBar icons={iconArray} />
            <EditIcon editIcon={editItem} />
            <TrashIcon deleteItem={deleteItem} />
        </div>
    );
};

export default TodoListIconBar;
