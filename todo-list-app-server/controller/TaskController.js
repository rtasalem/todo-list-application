const Task = require("../model/Task"); // Adjust the path based on your project structure
const sequelize = require("../server");

sequelize
    .authenticate()
    .then(() => {
        console.log("Connection has been established successfully.");

        Task.create({
            name: "gergbonrtgovien",
            description: "bcioebvieiwencinecvrv",
            endDate: 2023 - 12 - 25,
            completed: true,
            listOfTasksId: null,
            mainListId: 1,
            mediaBlobId: null,
            taskPriorityId: null
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