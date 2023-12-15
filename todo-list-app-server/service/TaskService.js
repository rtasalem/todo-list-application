const Task = require("../model/Task");

const TaskService = {
    // Get all tasks:
    async getAllTasks() {
        try {
            const tasks = await Task.findAll();
            return tasks;
        } catch (err) {
            console.error(err.message);
        }
    },

    // Get task by id:
    async getTaskById(id) {
        try {
            const task = await Task.findByPk(id);
            if (!task) {
                throw new Error(`Task with id of ${id} not found.`);
            }
            return task;
        } catch (err) {
            console.error(err.message);
        }
    },

    // Create task:
    async createTask(taskData) {
        try {
            console.log("Received task data: ", taskData);
            const newTask = await Task.create(taskData);
            return newTask;
        } catch (err) {
            console.error(err.message);
        }
    },

    // Update task:
    async updateTask(id, updatedTaskData) {
        try {
            const task = await Task.findByPk(id);
            if (!task) {
                throw new Error(`Task with id of ${id} not found.`);
            }
            const updatedTask = await task.update(updatedTaskData);
            return updatedTask;
        } catch (err) {
            console.error(err.message);
        }
    },

    // Delete task:
    async deleteTaskById(id) {
        try {
            const task = await Task.findByPk(id);
            if (!task) {
                throw new Error(`Task with id of ${id} not found.`);
            }
            await task.destroy();
            return { message: `Task with id of ${id} successfully deleted.` }
        } catch (err) {
            console.error(err.message);
        }
    }
}

module.exports = TaskService;