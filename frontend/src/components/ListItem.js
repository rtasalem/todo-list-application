import TodoList from "./TodoList";
import TodoListIconBar from "./TodoListIconBar";
import TrashIcon from "./TrashIcon";
import axios from "axios";

const ListItem = ({ task, onDeleteSuccess }) => {

    const deleteItem = async () => {
        try {
            const response = await axios.delete(`http://localhost:3000/api/v1/tasks/${task.id}`);
            if (response.status === 200) {
                onDeleteSuccess(task.id)
            } else {
                console.error("Failed to delete task.");
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <li className="list-item">
            <div className="info-container">
                <p className="task-name">{task.name}</p>
            </div>

            <div className="button-container">
                <button className="edit">Edit</button>
                <button className="delete" onClick={deleteItem}>
                    <TrashIcon /> Delete
                </button>
            </div>
            <div className="icon-bar-container">
                <TodoListIconBar deleteItem={deleteItem} />
            </div>
        </li>
    );
}

export default ListItem;