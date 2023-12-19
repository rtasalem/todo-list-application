import { useState } from "react";
import axios from "axios";

const Modal = ({ mode, setShowModal, task }) => {
  const editMode = mode === 'edit';

  const [data, setData] = useState({
    name: editMode ? task.name : '',
    description: editMode ? task.description : '',
    endDate: editMode ? task.endDate : '',
    completed: editMode ? task.completed : false
  });

  const updateData = async () => {
    try {
      const response = await axios.put(`http://localhost:3000/api/v1/tasks/${task.id}`, {
        name: data.name,
        description: data.description,
        endDate: data.endDate,
        completed: data.completed
      });

      if (response.status === 200) {
        console.log("Task updated successfully.");
        setShowModal(false);
      } else {
        console.error("Failed to update task.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <div className="overlay">
      <div className="modal">
        <div className="form-title-container">
          <h3>{mode} To-Do</h3>
          <button onClick={() => setShowModal(false)}>X</button>
        </div>

        <form>
          <input
            required
            maxLength={50}
            placeholder="What do you need to-do?"
            name="name"
            value={data.name}
            onChange={handleChange}
          />
          <br />
          <input
            maxLength={500}
            placeholder="Description"
            name="description"
            value={data.description}
            onChange={handleChange}
          />
          <br />
          <input
            type="date"
            name="endDate"
            value={data.endDate}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="completed">Completed?</label>
          <input
            type="checkbox"
            name="completed"
            checked={data.completed}
            onChange={handleChange}
          />
          <br />
          <input
            className={mode}
            type="submit"
            onClick={editMode ? updateData : setData}
          />
        </form>
      </div>
    </div>
  );
};

export default Modal;
