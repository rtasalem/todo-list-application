import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ListItem from './ListItem';

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

  const handleDeleteSuccess = (deletedTaskId) => {
    // Update the state or perform any other action based on the deleted task ID
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== deletedTaskId));
  };

  return (
    <div className="your-todo-list-container">
      <h2>Your To-Do Lists</h2>

      {/* Render tasks using ListItem */}
      {tasks.map((task) => (
        <ListItem key={task.id} task={task} onDeleteSuccess={handleDeleteSuccess} />
      ))}
    </div>
  );
};

export default TodoList;
