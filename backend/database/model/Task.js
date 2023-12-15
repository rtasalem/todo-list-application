const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

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
  },
  {
    tableName: "Task",
    timestamps: false,
  }
);

sequelize
  .sync({ force: true })
  .then(() => {
    console.log("Task model synced successfully!");
  })
  .catch((error) => {
    console.error("Unable to sync Task model: ", error.message);
  });

module.exports = Task;
