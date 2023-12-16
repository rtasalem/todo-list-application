const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("todo-app", "fdmdev", "admin", {
  host: "postgres",
  dialect: "postgres",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });

module.exports = sequelize;
