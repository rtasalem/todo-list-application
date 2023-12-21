import { useState } from 'react';
import React from 'react';
import TodoListIconBar from './TodoListIconBar';
import Modal from './Modal';
import { deleteTask } from '../services/api';

const ListItem = ({ task, onDeleteSuccess }) => {

    const [showModal, setShowModal] = useState(false);

    const deleteItem = async () => {
        const success = await deleteTask(task.id);
        if (success) {
            onDeleteSuccess(task.id);
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
