const express = require("express");
const app = express();
const TaskController = require("../todo-list-app-server/controller/TaskController");

// Middlewares
app.use(express.json());
app.use('/tasks', TaskController);


app.listen(5001, () => {
    console.log("Server is listening on port 5001...");
});