const User = require("./model/User");
const Task = require("./model/Task");
//const Collection = require("./model/Collection");
//const Priority = require("./model/Priority");
//const MediaBlob = require("./model/MediaBlob");

User.hasMany(Task);
Task.belongsTo(User);
//User.hasMany(Collection);
//Collection.belongsTo(User);
//Collection.hasMany(Task);
//Task.belongsTo(Collection);
//Task.hasOne(Priority);
//Priority.belongsTo(Task);
//Task.hasMany(MediaBlob);
//MediaBlob.belongsTo(Task);

module.exports = {
  User,
  Task,
};
