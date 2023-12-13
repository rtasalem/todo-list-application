const sequelize = require("../server");
const Task = require("../model/Task");

// Create a new task:
const createTask = async ({ name, description, endDate, completed, listOfTasksId, mainListId, mediaBlobId, taskPriorityId }) => {
    try {
        const newTask = await Task.create({
            name,
            description,
            endDate,
            completed,
            listOfTasksId,
            mainListId,
            mediaBlobId,
            taskPriorityId
        });
        return newTask;
    } catch (error) {
        throw new Error("There has been an error creating this task: " + error.message);
    }
};

module.exports = {
    createTask
}