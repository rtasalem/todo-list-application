const Sequelize = require("sequelize");
const sequelize = require("../server");

// Define the User model
const User = sequelize.define(
  "User",
  {
    username: Sequelize.STRING,
    password: Sequelize.STRING,
    first_name: Sequelize.STRING,
    last_name: Sequelize.STRING,
    mainListId: Sequelize.BIGINT,
  },
  {
    tableName: "User",
    timestamps: false,
  }
);

// Sync the model with the database
sequelize
  .sync()
  .then(() => {
    console.log("User model synced successfully!");
  })
  .catch((error) => {
    console.error("Unable to sync User model: ", error);
  });

module.exports = User;
