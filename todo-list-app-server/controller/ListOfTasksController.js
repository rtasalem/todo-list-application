const ListOfTasks = require("../model/ListOfTasks");
const sequelize = require("../server");

sequelize
    .authenticate()
    .then(() => {
        console.log("Connection has been established successfully.");

        ListOfTasks.create({
            name: "ivejrbvgo",
            itemsList: [1, 2, 3],
            mainListId: 1,
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
