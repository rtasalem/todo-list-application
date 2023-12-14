const express = require("express");
const app = express();
const TaskController = require("./controller/TaskController");

// Middlewares
app.use(express.json());

app.use('/api/v1/tasks', TaskController);


app.listen(5001, () => {
    console.log("Server is listening on port 5001...");
});