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

/*Priority.beforeCreate(async (priority, options) => {
  const existingPriority = await Priority.findOne({
    where: { taskId: priority.taskId },
  });

  if (existingPriority) {
    throw new Error("Priority with this taskId already exists.");
  }
});*/

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
  Collection,
  Priority,
  MediaBlob,
};
