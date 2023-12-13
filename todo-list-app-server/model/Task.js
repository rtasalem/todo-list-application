const Sequelize = require("sequelize");
const sequelize = require("../server");

// Define the User model
const Task = sequelize.define(
    "Task",
    {
        name: Sequelize.STRING,
        description: Sequelize.STRING,
        endDate: Sequelize.DATE,
        completed: Sequelize.BOOLEAN,
        listOfTasksId: Sequelize.BIGINT,
        mainListId: Sequelize.BIGINT,
        mediaBlobId: Sequelize.BIGINT,
        taskPriorityId: Sequelize.BIGINT
    },
    {
        tableName: "Task",
        timestamps: false,
    }
);

sequelize
    .sync()
    .then(() => {
        console.log("Task model synced sucessfully.");
    })
    .catch((error) => {
        console.error("Unable to sync Task model: ", error);
    });

module.exports = Task;