const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const Priority = sequelize.define(
  "Priority",
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
    color: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
  },
  {
    tableName: "Priority",
    timestamps: false,
  }
);

sequelize
  .sync({ force: true })
  .then(() => {
    console.log("Priority model synced successfully!");
  })
  .catch((error) => {
    console.error("Unable to sync Priority model: ", error.message);
  });

module.exports = Priority;
