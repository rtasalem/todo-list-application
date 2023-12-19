import { useState } from 'react';
import React from 'react';
import TodoListIconBar from './TodoListIconBar';
import axios from "axios";
import Modal from './Modal';

const ListItem = ({ task, onDeleteSuccess }) => {

    const [showModal, setShowModal] = useState(false);

    const deleteItem = async () => {
        try {
            const response = await axios.delete(`http://localhost:3000/api/v1/tasks/${task.id}`);
            if (response.status === 200) {
                onDeleteSuccess(task.id);
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

            <TodoListIconBar editItem={() => setShowModal(true)} deleteItem={deleteItem} />
            {showModal && <Modal mode={'edit'} setShowModal={setShowModal} task={task} />}
        </li>
    );
}

export default ListItem;
