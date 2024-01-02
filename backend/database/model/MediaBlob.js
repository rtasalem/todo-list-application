const { DataTypes } = require("sequelize");
const sequelize = require("../db-config.js");

const MediaBlob = sequelize.define(
  "MediaBlob",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    caption: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    mediaUrl: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    type: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
  },
  {
    tableName: "MediaBlob",
    timestamps: false,
  }
);

module.exports = MediaBlob;
