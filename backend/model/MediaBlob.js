const { DataTypes } = require("sequelize");
const sequelize = require("../database/sequelize");

const MediaBlob = sequelize.define(
  "MediaBlob",
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
    base64: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING(5),
      allowNull: false,
    },
    taskId: DataTypes.BIGINT,
  },
  {
    tableName: "MediaBlob",
    timestamps: false,
  }
);

sequelize
  .sync()
  .then(() => {
    console.log("Media Blob model synced successfully!");
  })
  .catch((error) => {
    console.error("Unable to sync Media Blob model: ", error);
  });

module.exports = MediaBlob;
