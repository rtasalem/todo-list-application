const Sequelize = require("sequelize");
const sequelize = require("../server");

// Define the User model
const ListOfTasks = sequelize.define(
    "ListOfTasks",
    {
        name: Sequelize.STRING,
        itemsList: Sequelize.ARRAY(Sequelize.DataTypes.BIGINT),
        mainListId: Sequelize.BIGINT,
    },
    {
        tableName: "ListOfTasks",
        timestamps: false,
    }
);

sequelize
    .sync()
    .then(() => {
        console.log("**************List Of Tasks model synced successfully!");
    })
    .catch((error) => {
        console.error("Unable to sync List Of Tasks model: ", error);
    });

module.exports = ListOfTasks;
