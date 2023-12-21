import { useState } from "react";
import React from "react";
import TodoListIconBar from "./TodoListIconBar";
import axios from "axios";
import Modal from "./Modal";
import FlagIcon from "./Priority"; // Import FlagIcon component

const ListItem = ({ task, onDeleteSuccess, editItem }) => {
  const [showModal, setShowModal] = useState(false);

  const deleteItem = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/v1/tasks/${task.id}`
      );
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

      <button className="edit" onClick={() => setShowModal(true)}>
        EDIT
      </button>

      <TodoListIconBar deleteItem={deleteItem} />
      {/* Pass the task ID to the FlagIcon component */}
      {console.log("Task ID:", task.id)}
      <FlagIcon
        taskId={task.id}
        initialColor={task.flag.color}
        initialName={task.flag.name}
        initialFlagId={task.flag.id}
      />

      {showModal && (
        <Modal mode={"edit"} setShowModal={setShowModal} task={task} />
      )}
    </li>
  );
};

export default ListItem;
