const Sequelize = require("sequelize");
const { Op, DataTypes } = Sequelize;
const sequelize = new Sequelize({})
const User = sequelize.define(
  "User",
  {
    id: { 
      type: DataTypes.BIGINT, 
      primaryKey: true, 
      autoIncrement: true 
    },
    email: {
      type: DataTypes.STRING, 
      allowNull: false,
      unique: true,
      validate: {
        is: /^([a-z][a-zA-Z0-9\-\.\_]+@[a-zA-Z]+\.[a-zA-Z]{1,3})$/
      }
    },
    password:{
      type: DataTypes.STRING(64),
      allowNull: false,
      validate: {
        is: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{10,}$/i
      }
    },
    first_name: {
      type: DataTypes.STRING, 
      allowNull: false,
    },
    last_name: DataTypes.STRING(50),
    mainListId: DataTypes.BIGINT,
  },
  {
    tableName: "User",
  }
);

// Sync the model with the database
sequelize
  .sync()
  .then(() => {
    console.log("User model synced successfully!");
  })
  .catch((error) => {
    console.error("Unable to sync User model: ", error);
  });

module.exports = User;
