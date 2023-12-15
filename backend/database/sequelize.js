const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("todo-app", "fdmdev", "admin", {
  host: "postgres",
  dialect: "postgres",
});

module.exports = sequelize;
