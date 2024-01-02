const sequelize = require("./sequelize");
const User = require("./model/User");
const Task = require("./model/Task");
const Collection = require("./model/Collection");
const Priority = require("./model/Priority");
const MediaBlob = require("./model/MediaBlob");

User.hasMany(Task);
Task.belongsTo(User);
User.hasMany(Collection);
Collection.belongsTo(User);
Collection.hasMany(Task);
Task.belongsTo(Collection);
Task.hasOne(Priority);
Priority.belongsTo(Task);
Task.hasMany(MediaBlob);
MediaBlob.belongsTo(Task);

sequelize
  .sync({ force: true })
  .then(() => {
    console.log("Models synced successfully!");
  })
  .catch((error) => {
    console.error("Unable to sync models: ", error.message);
  });

module.exports = {
  User,
  Task,
  MediaBlob,
  Collection,
  Priority,
};
