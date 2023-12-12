const Sequelize = require("sequelize");
const sequelize = require("../server");

// Define the User model
const Calendar = sequelize.define(
    "Calendar",
    {
        taskIdArray: Sequelize.ARRAY(Sequelize.DataTypes.BIGINT),
    },
    {
        tableName: "Calendar",
        timestamps: false,
    }
);

sequelize
    .sync()
    .then(() => {
        console.log("**************Calendar model synced successfully!");
    })
    .catch((error) => {
        console.error("Unable to sync Calendar model: ", error);
    });

module.exports = Calendar;
