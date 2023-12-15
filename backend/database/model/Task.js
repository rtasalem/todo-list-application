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

module.exports = Task;
