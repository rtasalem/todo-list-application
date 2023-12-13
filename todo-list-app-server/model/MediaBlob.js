const Sequelize = require("sequelize");
const sequelize = require("../server");

// Define the User model
const MediaBlob = sequelize.define(
  "MediaBlob",
  {
    name: Sequelize.STRING,
    type: Sequelize.STRING,
    taskId: Sequelize.BIGINT,
  },
  {
    tableName: "MediaBlob",
    timestamps: false,
  }
);

sequelize
  .sync()
  .then(() => {
    console.log("**************Media Blob model synced successfully!");
  })
  .catch((error) => {
    console.error("Unable to sync Media Blob model: ", error);
  });

module.exports = MediaBlob;
