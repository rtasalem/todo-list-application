import React, { useEffect, useState } from "react";
import axios from "axios";
import ListItem from "./ListItem";

const DEFAULT_FLAG = { name: "Black", color: "#000000" };

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

  const handleFlagDeleteSuccess = (taskId, flagId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            flag: {
              id: undefined,
              name: null,
              color: undefined,
            },
          };
        }
        return task;
      })
    );
  };

  const handleFlagSaveSuccess = (taskId, updatedFlag) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            flag: {
              id: updatedFlag.flagId,
              name: updatedFlag.flagName,
              color: updatedFlag.flagColor,
            },
          };
        }
        return task;
      })
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
          //onFlagDeleteSuccess={handleFlagDeleteSuccess}
          onSaveFlagSuccess={handleFlagSaveSuccess}
          onDeleteFlag={handleFlagDeleteSuccess}
        />
      ))}
    </div>
  );
};

export default TodoList;
