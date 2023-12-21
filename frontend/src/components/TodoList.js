// TodoList.js
import { useEffect, useState } from "react";
import axios from "axios";
import ListItem from "./ListItem";
import DEFAULT_FLAG from "./Priority";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/tasks");

        if (response.status === 200) {
          const tasksWithFlags = await Promise.all(
            response.data.map(async (task) => {
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

  return (
    <div className="your-todo-list-container">
      <h2>Your To-Do Lists</h2>
      {tasks.map((task) => (
        <ListItem
          key={task.id}
          task={task}
          onDeleteSuccess={handleDeleteSuccess}
          initialFlagColor={task.flag.color}
          initialFlagName={task.flag.name}
          initialFlagId={task.flag.id}
        />
      ))}
    </div>
  );
};

export default TodoList;
