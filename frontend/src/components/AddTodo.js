import { useState } from "react";
import axios from "axios";
import AddTodoIconBar from "./AddTodoIconBar";
import Modal from "./Modal";
import { addTask } from "../services/api";

const AddTodo = () => {
  const [taskName, setTaskName] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Getting to the handleSubmit");
    const success = await addTask(taskName);

    if (success) {
      setTaskName("");
      window.location.reload();
    }
  };

  const handleInputChange = (e) => {
    setTaskName(e.target.value);
  };

  return (
    <div className="add-todo">
      <h2>Add a To-Do...</h2>
      <div className="form-container">
        <form onSubmit={handleSubmit} id="add-todo-form">
          <input
            type="text"
            placeholder="What do you need to-do?"
            value={taskName}
            onChange={handleInputChange}
            autoFocus
          />
        </form>
        <div className="icon-bar-container">
          <AddTodoIconBar addItem={() => setShowModal(true)} />
          {showModal && <Modal mode={"create"} setShowModal={setShowModal} />}
        </div>
      </div>
    </div>
  );
};

export default AddTodo;
