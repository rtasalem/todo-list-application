import { useState } from 'react';
import React from 'react';
import TodoListIconBar from './TodoListIconBar';
import axios from "axios";
import Modal from './Modal';

const ListItem = ({ task, onDeleteSuccess, editItem }) => {

    const [showModal, setShowModal] = useState(false);

    // const handleEditItem = async () => {
    //     try {
    //         const response = await axios.put(`http://localhost:3000/api/v1/tasks/${task.id}`, {
    //             name: task.name,
    //             description: task.description,
    //             endDate: task.endDate,
    //             completed: task.completed
    //         });

    //         if (response.status === 200) {
    //             console.log("Task updated successfully.");
    //             setShowModal(true);
    //         } else {
    //             console.error("Failed to update task.");
    //         }
    //     }
    //     catch (err) {
    //         console.error(err);
    //     }
    // };

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

            <button className="edit" onClick={() => setShowModal(true)}>EDIT</button>

            <TodoListIconBar deleteItem={deleteItem} />
            {showModal && <Modal mode={'edit'} setShowModal={setShowModal} task={task} />}
        </li>
    );
}

export default ListItem;
