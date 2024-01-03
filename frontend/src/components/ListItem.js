import React, { useState } from "react";
import TodoListIconBar from "./TodoListIconBar";
import Modal from "./Modal";
import { deleteTask, updateTaskCompletionStatus } from "../services/api";
import FlagIcon from "./FlagIcon";

const ListItem = ({
  task,
  onDeleteSuccess,
  onFlagDeleteSuccess,
  onSaveFlagSuccess,
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

  return (
    <li className={`form-container ${completed ? "completed" : ""}`}>
      <div className="info-container">
        <p className={`task-name ${completed ? "completed" : ""}`}>
          {task.name}
        </p>
      </div>
      <TodoListIconBar
        checkItem={toggleComplete}
        editItem={() => setShowModal(true)}
        deleteItem={deleteItem}
        completed={completed}
      />
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
