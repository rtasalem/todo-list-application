const Sequelize = require("sequelize");
const sequelize = require("../server");

// Define the User model
const TaskPriority = sequelize.define(
    "TaskPriority",
    {
        name: Sequelize.STRING,
        color: Sequelize.STRING,
        taskId: Sequelize.BIGINT
    },
    {
        tableName: "TaskPriority",
        timestamps: false,
    }
);

sequelize
    .sync()
    .then(() => {
        console.log("Task Priority model synced successfully!");
    })
    .catch((error) => {
        console.error("Unable to sync Task Priority model: ", error);
    });

module.exports = TaskPriority;