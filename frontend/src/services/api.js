import axios from 'axios';

// Get tasks
export const getTasks = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/tasks');
  
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
        const response = await axios.post('http://localhost:3000/api/v1/tasks', {
            name: taskName
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
        const response = await axios.put(`http://localhost:3000/api/v1/tasks/${taskId}`, newData);

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
        const response = await axios.delete(`http://localhost:3000/api/v1/tasks/${taskId}`);
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