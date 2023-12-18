import { useState } from "react"
import axios from "axios"

const Modal = ({ mode, setShowModal, task }) => {
    const editMode = mode === 'edit' ? true : false
    
    const [data, setData] = useState({
        name: editMode ? task.name : null,
        description: editMode ? task.description : null,
        endDate: editMode ? task.endDate : null,
        completed: editMode ? task.completed : false
    })

    const postData = async () => {
        try {
            const response = await axios.post("http://localhost:3000/api/v1/tasks", {
                name: data.name,
                description: data.description,
                endDate: data.endDate,
                completed: data.completed
            });
    
            if (response.status === 200) {
                console.log("Task created successfully.");
            } else {
                console.error("Failed to create task.");
            }
        } catch (err) {
            console.error(err);
        }
    };
    

    const handleChange = (e) => {
        console.log("Changing!", e)
        const { name, value } = e.target

        setData(data => ({
            ...data,
            [name]: value
        }))
    }

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
                        value={data.completed}
                        onChange={handleChange}
                    />
                    <br />
                    <input className={mode} type="submit" onClick={editMode ? '': postData} />
                </form>
            </div>
        </div>
    )
}

export default Modal;