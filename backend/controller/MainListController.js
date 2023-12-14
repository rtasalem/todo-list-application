const MainList = require("../model/MainList"); // Adjust the path based on your project structure
const sequelize = require("../server");

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");

    MainList.create({
      userId: 4,
      taskId: null,
      listId: null,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.error("Failed to create a new record : ", error);
      });
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });
