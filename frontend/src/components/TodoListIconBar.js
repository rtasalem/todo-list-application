import IconBar from './IconBar';
import { BsImage, BsPlayCircle, BsCheckSquare, BsPencilSquare } from 'react-icons/bs';
import TrashIcon from './TrashIcon';

const TodoListIconBar = ({ deleteItem }) => {
    const iconArray = [BsImage, BsPlayCircle, BsCheckSquare, BsPencilSquare];

    return (
        <div className="icon-bar-container">
            <IconBar icons={iconArray} />
            <TrashIcon deleteItem={deleteItem} />
        </div>
    );
};

export default TodoListIconBar;
