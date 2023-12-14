import IconBar from './IconBar';
import { BsImage, BsPlayCircle, BsCheckSquare, BsPencilSquare, BsTrash3 } from 'react-icons/bs';


const YourTodoListIconBar = () => {
  const iconArray = [BsImage, BsPlayCircle, BsCheckSquare, BsPencilSquare, BsTrash3];

  return (
      <IconBar icons={iconArray} />
  );
};

export default YourTodoListIconBar;
