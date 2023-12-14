const Sequelize = require("sequelize");
const { Op, DataTypes } = Sequelize;
const sequelize = require("../server");

// Define the User model
const Task = sequelize.define(
  "Task",
  {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    endDate: DataTypes.DATE,
    completed: DataTypes.BOOLEAN,
    listOfTasksId: DataTypes.BIGINT,
    mainListId: DataTypes.BIGINT,
    mediaBlobId: DataTypes.BIGINT,
    taskPriorityId: DataTypes.BIGINT,
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
