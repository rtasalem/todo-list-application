const MediaBlob = require("../model/MediaBlob");
const sequelize = require("../server");

sequelize
    .authenticate()
    .then(() => {
        console.log("Connection has been established successfully.");

        MediaBlob.create({
            name: "ojergboerbgobgtoer",
            type: "ojbgeovrfvo",
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
