const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

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
  },
  {
    tableName: "MediaBlob",
    timestamps: false,
  }
);

module.exports = MediaBlob;
