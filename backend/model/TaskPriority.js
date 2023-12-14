const { DataTypes } = require("sequelize");
const sequelize = require("../database/sequelize");

const TaskPriority = sequelize.define(
  "TaskPriority",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },

    name: DataTypes.STRING,
    color: DataTypes.STRING,
    taskId: DataTypes.BIGINT,
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
