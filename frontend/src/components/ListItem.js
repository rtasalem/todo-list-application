import React from 'react';
import TodoListIconBar from './TodoListIconBar';
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
        <li className="form-container">
            <div className="info-container">
                <p className="task-name">{task.name}</p>
            </div>
            <TodoListIconBar deleteItem={deleteItem} />
        </li>
    );
}

export default ListItem;
