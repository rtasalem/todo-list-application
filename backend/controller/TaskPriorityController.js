const TaskPriority = require("../model/TaskPriority");
const sequelize = require("../server");

sequelize
    .authenticate()
    .then(() => {
        console.log("Connection has been established successfully.");

        TaskPriority.create({
            name: "fijrbeigvjbre",
            color: "Yellow",
            taskId: 1
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
