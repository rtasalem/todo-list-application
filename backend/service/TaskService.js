const { Task, Priority } = require("../database/associations.js");

const TaskService = {
  // Get all tasks
  async getAllTasks() {
    try {
      const tasks = await Task.findAll();
      return tasks;
    } catch (err) {
      console.error("Error fetching tasks:", err.message);
      throw err;
    }
  },

  // Get task by id
  async getTaskById(id) {
    try {
      const task = await Task.findByPk(id);
      if (!task) {
        throw new Error(`Task with id of ${id} not found.`);
      }
      return task;
    } catch (err) {
      console.error("Error fetching task by id:", err.message);
      throw err;
    }
  },

  // Create task
  async createTask(taskData) {
    try {
      const newTask = await Task.create(taskData);
      return newTask;
    } catch (err) {
      console.error("Error creating task:", err.message);
      throw err;
    }
  },

  // Update task
  async updateTask(id, updatedTaskData) {
    try {
      const task = await Task.findByPk(id);
      if (!task) {
        throw new Error(`Task with id of ${id} not found.`);
      } else {
        await task.update(updatedTaskData);
        return task;
      }
    } catch (err) {
      console.error("Error updating task:", err.message);
      throw err;
    }
  },

  // Patch task
  async patchTask(id, patchedTaskData) {
    try {
      const task = await Task.findByPk(id);
      if (!task) {
        throw new Error(`Task with id of ${id} not found.`);
      } else {
        await task.update(patchedTaskData);
        return task;
      }
    } catch (err) {
      console.error("Error patching task:", err.message);
      throw err;
    }
  },

  // Delete task
  async deleteTaskById(id) {
    try {
      const task = await Task.findByPk(id);
      if (!task) {
        return null;
      }
      await task.destroy();
      return { message: "Task successfully deleted." };
    } catch (err) {
      console.error("Error deleting task:", err.message);
      throw err;
    }
  },
  async getPriorityByTaskId(taskId) {
    try {
      const task = await Task.findByPk(taskId, {
        include: [{ model: Priority, attributes: ["id", "name", "color"] }],
      });

      if (!task || !task.Priority) {
        throw new Error("Priority not found for the given taskId.");
      }

      const { id, name, color } = task.Priority;
      return { id, name, color };
    } catch (err) {
      console.error("Error getting Priority by TaskId:", err.message);
      throw err;
    }
  },
};

module.exports = TaskService;
