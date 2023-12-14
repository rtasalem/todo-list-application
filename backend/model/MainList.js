const Sequelize = require("sequelize");
const sequelize = require("../server");

// Define the User model
const MainList = sequelize.define(
  "MainList",
  {
    userId: Sequelize.BIGINT,
    taskId: Sequelize.BIGINT,
    listId: Sequelize.BIGINT,
  },
  {
    tableName: "MainList",
    timestamps: false,
  }
);

sequelize
  .sync()
  .then(() => {
    console.log("Main List model synced successfully!");
  })
  .catch((error) => {
    console.error("Unable to sync Main List model: ", error);
  });

module.exports = MainList;
