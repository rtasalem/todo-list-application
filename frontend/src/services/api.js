import axios from 'axios';

const apiConfig = {
  baseURL: `http://localhost:${process.env.PORT || 3000}/api/v1`,
};

// Get tasks
export const getTasks = async () => {
  try {
    const response = await axios.get(`${apiConfig.baseURL}/tasks`);

    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Failed to fetch tasks.');
      return [];
    }
  } catch (error) {
    console.error('An error occurred:', error);
    return [];
  }
};

// Add task
export const addTask = async (taskName) => {
  try {
    const response = await axios.post(`${apiConfig.baseURL}/tasks`, {
      name: taskName,
    });

    if (response.status === 201) {
      return true;
    } else {
      console.error(`Failed to add task. Unexpected status code: ${response.status}`);
      return false;
    }
  } catch (error) {
    console.error('An error occurred:', error);
    return false;
  }
};

// Edit task
export const editTask = async (taskId, newData) => {
  try {
    const response = await axios.put(`${apiConfig.baseURL}/${taskId}`, newData);

    if (response.status === 200) {
      console.log("Task updated successfully.");
      return true;
    } else {
      console.error("Failed to update task.");
      return false;
    }
  } catch (error) {
    console.error('An error occurred:', error);
    return false;
  }
};

// Delete task
export const deleteTask = async (taskId) => {
  try {
    const response = await axios.delete(`${apiConfig.baseURL}/${taskId}`);
    if (response.status === 200) {
      return true;
    } else {
      console.error("Failed to delete task.");
      return false;
    }
  } catch (error) {
    console.error('An error occurred:', error);
    return false;
  }
};

// Update task completion status
export const updateTaskCompletionStatus = async (taskId, completed) => {
  try {
    const response = await axios.patch(`${apiConfig.baseURL}/${taskId}`, {
      completed: completed,
    });

    if (response.status === 200) {
      console.log('Task completion status updated successfully.');
      return true;
    } else {
      console.error('Failed to update task completion status.');
      return false;
    }
  } catch (error) {
    console.error('An error occurred:', error);
    return false;
  }
};
