const { DataTypes } = require("sequelize");
const sequelize = require("../db-config.js");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        is: /^([a-z][a-zA-Z0-9\-\.\_]+@[a-zA-Z]+\.[a-zA-Z]{1,3})$/,
      },
    },
    password: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    last_name: DataTypes.STRING(50),
  },
  {
    tableName: "User",
    timestamps: false,
  }
);

module.exports = User;
