import axios from "axios";

// Get tasks
export const getTasks = async () => {
  try {
    const response = await axios.get("http://localhost:8088/api/v1/tasks");

    if (response.status === 200) {
      // Check.
      return response;
    } else {
      console.error("Failed to fetch tasks.");
      return [];
    }
  } catch (error) {
    console.error("An error occurred:", error);
    return [];
  }
};

// Add task
export const addTask = async (taskName, taskDescription, endDate) => {
  try {
    // Function to format date to "YYYY-MM-DD" format
    const formatDate = (dateString) => {
      const dateObject = new Date(dateString);
      const year = dateObject.getFullYear();
      const month = String(dateObject.getMonth() + 1).padStart(2, "0");
      const day = String(dateObject.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    // Format the endDate property if it exists
    const formattedEndDate = endDate ? formatDate(endDate) : null;

    const response = await axios.post("http://localhost:8088/api/v1/tasks", {
      name: taskName,
      description: taskDescription,
      endDate: formattedEndDate,
    });

    if (response.status === 201) {
      return true;
    } else {
      console.error(
        `Failed to add task. Unexpected status code: ${response.status}`
      );
      return false;
    }
  } catch (error) {
    console.error("An error occurred:", error);
    return false;
  }
};

// Edit task
export const editTask = async (taskId, newData) => {
  try {
    const response = await axios.put(
      `http://localhost:8088/api/v1/tasks/${taskId}`,
      newData
    );

    if (response.status === 200) {
      console.log("Task updated successfully.");
      return true;
    } else {
      console.error("Failed to update task.");
      return false;
    }
  } catch (error) {
    console.error("An error occurred:", error);
    return false;
  }
};

// Delete task
export const deleteTask = async (taskId) => {
  try {
    const response = await axios.delete(
      `http://localhost:8088/api/v1/tasks/${taskId}`
    );
    if (response.status === 200) {
      return true;
    } else {
      console.error("Failed to delete task.");
      return false;
    }
  } catch (error) {
    console.error("An error occurred:", error);
    return false;
  }
};

// Update task completion status
export const updateTaskCompletionStatus = async (taskId, completed) => {
  try {
    const response = await axios.patch(
      `http://localhost:8088/api/v1/tasks/${taskId}`,
      {
        completed: completed,
      }
    );

    if (response.status === 200) {
      console.log("Task completion status updated successfully.");
      return true;
    } else {
      console.error("Failed to update task completion status.");
      return false;
    }
  } catch (error) {
    console.error("An error occurred:", error);
    return false;
  }
};
