// const sequelize = require("../server");
const TaskPriority = require ('../model/TaskPriority');

const TaskPriorityService = {

    // get task priority by id
    async getTaskPriorityById(id) {
        try {
            const priority = await TaskPriority.findByPk(id);
            if (!priority) {
                throw new Error(`Task Priority with id of ${id} not found.`);
            }
            return priority;
        } catch (err) {
            console.error(err.message);
            throw err;
        }
    },

    // update task priority
    async updateTaskPriority(id, updatedTaskPriority) {
        try {
            const priority = await TaskPriority.findByPk(id);
            if (!priority) {
                throw new Error(`Task Priority with id of ${id} not found.`);
            }
            const updatedPriority = await priority.update(updatedTaskPriority);
            return updatedPriority;
        } catch (err) {
            console.error(err.message);
            throw err;
        }
    },

    // delete task priority
    async deleteTaskPriorityById(id) {
        try {
            const priority = await TaskPriority.findByPk(id);
            if (!priority) {
                throw new Error(`Task Priority with id of ${id} not found.`);
            }
            await priority.destroy();
            return { message: `Task Priority with id of ${id} successfully deleted.` }
        } catch (err) {
            console.error(err.message);
            throw err;
        }
    }
}

module.exports = TaskPriorityService;
