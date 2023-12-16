import IconBar from './IconBar';
import { BsImage, BsPlayCircle, BsCheckSquare, BsPencilSquare } from 'react-icons/bs';
import TrashIcon from './TrashIcon';

const TodoListIconBar = ({ deleteItem }) => {
  const iconArray = [BsImage, BsPlayCircle, BsCheckSquare, BsPencilSquare, TrashIcon];

  return (
      <IconBar icons={iconArray} deleteItem={deleteItem} />
  );
};

export default TodoListIconBar;
