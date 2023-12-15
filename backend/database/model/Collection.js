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

module.exports = Collection;
