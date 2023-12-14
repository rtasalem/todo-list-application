const { DataTypes } = require("sequelize");
const sequelize = require("../database/sequelize");

// Define the User model
const TaskList = sequelize.define(
  "TaskList",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: DataTypes.BIGINT,
    taskId: DataTypes.BIGINT,
    listId: DataTypes.BIGINT,
  },
  {
    tableName: "TaskList",
    timestamps: false,
  }
);

sequelize
  .sync()
  .then(() => {
    console.log("Main List model synced successfully!");
  })
  .catch((error) => {
    console.error("Unable to sync Main List model: ", error);
  });

module.exports = TaskList;
