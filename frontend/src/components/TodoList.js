import { useEffect, useState } from 'react';
import ListItem from './ListItem';
import { getTasks } from '../services/api';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const tasksData = await getTasks();
      setTasks(tasksData);
    };

    fetchTasks();
  }, []);

  const handleDeleteSuccess = (deletedTaskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== deletedTaskId));
  };

  return (
    <div className="your-todo-list-container">
      <h2>Your To-Do Lists</h2>
      {tasks.map((task) => (
        <ListItem key={task.id} task={task} onDeleteSuccess={handleDeleteSuccess} />
      ))}
    </div>
  );
};

export default TodoList;
