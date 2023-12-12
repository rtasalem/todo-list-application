const Calendar = require("../model/Calendar");
const sequelize = require("../server");

sequelize
    .authenticate()
    .then(() => {
        console.log("Connection has been established successfully.");

        Calendar.create({
            taskIdArray: [4, 5, 6]
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
