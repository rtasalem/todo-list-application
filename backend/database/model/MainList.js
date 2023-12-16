const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const MainList = sequelize.define(
    "MainList",
    {
        id: {
            type : DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        userId: {
            type : DataTypes.BIGINT,
            allowNull: false,
        },
        taskId: {
            type : DataTypes.BIGINT,
        },
        listId: {
            type : DataTypes.BIGINT,
        },
    },
    {
        tableName: "MainList",
        timestamps: false,
    }
);

module.exports = MainList;

/*
CREATE TABLE public."MainList" (
    id bigint NOT NULL,
    "userId" bigint NOT NULL,
    "taskId" bigint,
    "listId" bigint
);
*/