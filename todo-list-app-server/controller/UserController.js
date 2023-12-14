const User = require("../model/User"); // Adjust the path based on your project structure
const sequelize = require("../server");

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");

    User.create({
      username: "PAmghmyK",
      password: "123",
      first_name: "Bobby",
      last_name: "",
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