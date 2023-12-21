import { useEffect, useState } from "react";
import axios from "axios";
import ListItem from "./ListItem";
import DEFAULT_FLAG from "./Priority";
import { getTasks, updateTaskCompletionStatus } from "../services/api";
import { BsSearch } from "react-icons/bs";
import { BsFilterSquare } from "react-icons/bs";
import Icon from "./icons/Icon";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasksData = await getTasks();
        if (tasksData.status === 200) {
          const tasksWithFlags = await Promise.all(
            tasksData.data.map(async (task) => {
              try {
                console.log("**************", task.id);
                const flagResponse = await axios.get(
                  `http://localhost:3000/api/v1/tasks/priority/${task.id}`
                );

                const flag = flagResponse.data || DEFAULT_FLAG;
                return { ...task, flag };
              } catch (flagError) {
                console.error(
                  `Error fetching flag for task ${task.id}:`,
                  flagError
                );
                return { ...task, flag: DEFAULT_FLAG };
              }
            })
          );

          setTasks(tasksWithFlags);
        } else {
          console.error("Failed to fetch tasks.");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
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
          initialFlagColor={task.flag.color}
          initialFlagName={task.flag.name}
          initialFlagId={task.flag.id}
        />
      ))}
    </div>
  );
};

export default TodoList;
