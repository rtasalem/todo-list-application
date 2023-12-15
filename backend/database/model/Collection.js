const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const Collection = sequelize.define(
  "Collection",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    tableName: "Collection",
    timestamps: false,
  }
);

sequelize
  .sync({ force: true })
  .then(() => {
    console.log("Collection model synced successfully!");
  })
  .catch((error) => {
    console.error("Unable to sync Collection model: ", error.message);
  });

module.exports = Collection;
