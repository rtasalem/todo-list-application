import IconBar from "./icons/IconBar";
import { BsImage, BsPlayCircle } from "react-icons/bs";
import CheckBoxIcon from "./icons/CheckBoxIcon";
import EditIcon from "./icons/EditIcon";
import TrashIcon from "./icons/TrashIcon";
import FlagIcon from "./Priority";

const TodoListIconBar = ({ checkItem, completed, editItem, deleteItem }) => {
    const iconArray = [
        FlagIcon,
        BsImage,
        BsPlayCircle,
    ];

    return (
        <div className="icon-bar-container">
            <IconBar icons={iconArray} />
            <EditIcon editItem={editItem} className="icon" />
            <CheckBoxIcon checkItem={checkItem} completed={completed} hoverClassName="green" className="icon" />
            <TrashIcon deleteItem={deleteItem} className="icon" />
        </div>
    );
};

export default TodoListIconBar;
