import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TodoListIconBar from './TodoListIconBar';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/tasks');

        if (response.status === 200) {
          setTasks(response.data);
        } else {
          console.error('Failed to fetch tasks.');
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="your-todo-list-container">
      <h2>Your To-Do Lists</h2>

      {tasks.map((task) => (
        <div key={task.id} className="form-container">
          <form>
            <input type="text" placeholder={`Todo ${task.id}`} value={task.name} readOnly />
          </form>
          <div className="icon-bar-container">
            <TodoListIconBar />
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
