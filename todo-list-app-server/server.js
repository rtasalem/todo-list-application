const Sequelize = require("sequelize");
const dbConfig = require("./config/db.config.js");

const { host, username, password, database, port, dialect } = dbConfig;

const sequelize = new Sequelize(database, username, password, {
  host,
  port,
  dialect,
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error.message);
  });

module.exports = sequelize;
