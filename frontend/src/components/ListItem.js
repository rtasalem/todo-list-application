import { useState } from "react";
import React from "react";
import TodoListIconBar from "./TodoListIconBar";
import Modal from "./Modal";
import FlagIcon from "./FlagIcon"; // Correct import statement
import { deleteTask, updateTaskCompletionStatus } from "../services/api";

const ListItem = ({
  task,
  onDeleteSuccess,
  onFlagDeleteSuccess,
  onSaveFlagSuccess,
  editItem,
  onDeleteFlag,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [completed, setCompleted] = useState(task.completed);

  const deleteItem = async () => {
    const success = await deleteTask(task.id);
    if (success) {
      onDeleteSuccess(task.id);
    }
  };

  const toggleComplete = async () => {
    const updatedCompletedStatus = !completed;
    setCompleted(updatedCompletedStatus);

    await updateTaskCompletionStatus(task.id, updatedCompletedStatus);
  };
  const deleteItem = async () => {
    const success = await deleteTask(task.id);
    if (success) {
      onDeleteSuccess(task.id);
    }
  };

  const toggleComplete = async () => {
    const updatedCompletedStatus = !completed;
    setCompleted(updatedCompletedStatus);

    await updateTaskCompletionStatus(task.id, updatedCompletedStatus);
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
      <FlagIcon
        key={`${task.id}-${task.flag.id}`}
        taskId={task.id}
        initialColor={task.flag.color}
        initialName={task.flag.name}
        initialFlagId={task.flag.id}
        onDeleteFlag={onDeleteFlag}
        onSaveFlagSuccess={onSaveFlagSuccess}
      />
      {showModal && (
        <Modal mode={"edit"} setShowModal={setShowModal} task={task} />
      )}
    </li>
  );
};

export default ListItem;
