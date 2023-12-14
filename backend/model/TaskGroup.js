const { DataTypes } = require("sequelize");
const sequelize = require("../database/sequelize");

const TaskGroup = sequelize.define(
  "TaskGroup",
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
    itemsList: DataTypes.ARRAY(DataTypes.BIGINT),
    taskListId: {
      type: DataTypes.INTEGER,
      foreignKey: {
        references: {
          table: "TaskList",
          key: "id",
        },
      },
      allowNull: false,
    },
  },
  {
    tableName: "TaskGroup",
    timestamps: false,
  }
);

sequelize
  .sync()
  .then(() => {
    console.log("List Of Tasks model synced successfully!");
  })
  .catch((error) => {
    console.error("Unable to sync List Of Tasks model: ", error);
  });

module.exports = TaskGroup;
