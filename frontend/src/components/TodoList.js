import { useEffect, useState } from "react";
import ListItem from "./ListItem";
import { getTasks, updateTaskCompletionStatus } from "../services/api";
import { BsSearch } from "react-icons/bs";
import { BsFilterSquare } from "react-icons/bs";
import Icon from "./icons/Icon";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      const tasksData = await getTasks();
      setTasks(tasksData);
    };

    fetchTasks();
  }, []);

  const handleDeleteSuccess = (deletedTaskId) => {
    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== deletedTaskId)
    );
  };

  const handleToggleComplete = async (taskId, completed) => {
    await updateTaskCompletionStatus(taskId, completed);

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const filteredTasks = tasks.filter((task) =>
    task.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="your-todo-list-container">
      <h2>Your To-Do Lists</h2>
      <div className="search">
        <div className="form-container">
          <form>
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>
          <button type="submit">
            <Icon icon={BsSearch} className="icon" />
          </button>
          <button type="submit">
            <Icon icon={BsFilterSquare} className="icon" />
          </button>
        </div>
      </div>
      {filteredTasks.map((task) => (
        <ListItem
          key={task.id}
          task={task}
          onDeleteSuccess={handleDeleteSuccess}
          onToggleComplete={(completed) =>
            handleToggleComplete(task.id, completed)
          }
        />
      ))}
    </div>
  );
};

export default TodoList;
