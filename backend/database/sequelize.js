const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  "hello_world_db",
  "DATABASE_USERNAME",
  "DATABASE_PASSWORD",
  {
    host: "DATABASE_HOST",
    dialect: "mysql",
  }
);

module.exports = sequelize;
