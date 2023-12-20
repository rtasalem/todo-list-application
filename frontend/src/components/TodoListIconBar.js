import IconBar from "./IconBar";
import { BsImage, BsPlayCircle, BsCheckSquare } from "react-icons/bs";
import TrashIcon from "./TrashIcon";
import EditIcon from "./EditIcon";
import FlagIcon from "./Priority";

const TodoListIconBar = ({ editItem, deleteItem }) => {
  const iconArray = [FlagIcon, BsImage, BsPlayCircle, BsCheckSquare];

  return (
    <div className="icon-bar-container">
      <IconBar icons={iconArray} />
      <EditIcon editItem={editItem} className="icon" />
      <TrashIcon deleteItem={deleteItem} className="icon" />
    </div>
  );
};

export default TodoListIconBar;
