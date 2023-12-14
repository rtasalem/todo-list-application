const { DataTypes } = require("sequelize");
const sequelize = require("../database/sequelize");

const Task = sequelize.define(
  "Task",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    description: DataTypes.TEXT,
    endDate: DataTypes.DATE,
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    taskGroupId: DataTypes.BIGINT,
    taskListId: DataTypes.BIGINT,
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
