import { useState } from 'react';
import axios from 'axios';
import AddTodoIconBar from "./AddTodoIconBar";

const AddTodo = () => {
    const [taskName, setTaskName] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/api/v1/tasks', {
                name: taskName
            });

            if (response.status === 201) {
                setTaskName("");
                window.location.reload();
            } else {
                console.error(`Failed to add task. Unexpected status code: ${response.status}`);
            }
        } catch (error) {
            console.error('An error occurred:', error);

            if (error.response) {
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
                console.error('Response headers:', error.response.headers);
            } else if (error.request) {
                console.error('No response received. Request details:', error.request);
            } else {
                console.error('Error details:', error.message);
            }
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
                    <AddTodoIconBar />
                </div>
            </div>
        </div>
    );
}

export default AddTodo;
