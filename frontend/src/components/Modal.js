import { useState } from "react";
import { editTask, addTask } from "../services/api";

const Modal = ({ mode, setShowModal, task }) => {
  const editMode = mode === 'edit';

  const [data, setData] = useState({
    name: editMode ? task.name || '' : '',
    description: editMode ? task.description || '' : '',
    endDate: editMode && task.endDate ? new Date(task.endDate).toISOString().split('T')[0] : '',
  });

  const updateData = async () => {
    try {
      if (editMode) {
        const success = await editTask(task.id, data);
  
        if (success) {
          setShowModal(false);
        }
      } else {
        const success = await addTask(data.name, data.description, data.endDate);
  
        if (success) {
          setShowModal(false);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
  
    setData((prevData) => ({
      ...prevData,
      [name]: name === 'endDate' ? (value ? new Date(value).toISOString().split('T')[0] : null) : value,
    }));
  };
  
  return (
    <div className="overlay">
      <div className="modal">
        <div className="form-title-container">
          <h3>{mode === 'edit' ? 'Edit' : 'Add'} To-Do</h3>
          <button onClick={() => setShowModal(false)}>X</button>
        </div>
  
        <form>
          <input
            required
            maxLength={50}
            placeholder="What do you need to-do?"
            name="name"
            value={data.name}
            onChange={(e) => handleChange(e)}
          />
          <br />
          <input
            maxLength={500}
            placeholder="Description"
            name="description"
            value={data.description}
            onChange={(e) => handleChange(e)}
          />
          <br />
          <input
            type="date"
            name="endDate"
            value={data.endDate}
            onChange={(e) => handleChange(e)}
          />
          <br />
          <br />
          <input
            className={mode}
            type="submit"
            onClick={updateData}
          />
        </form>
      </div>
    </div>
  );
};

export default Modal;
