const express = require("express");
const app = express();

// Middlewares
const TaskController = require("../todo-list-app-server/controller/TaskController");
app.use(express.json());
app.use('/todos', TaskController);

app.listen(5001, () => {
    console.log("Server is listening on port 5001...");
});