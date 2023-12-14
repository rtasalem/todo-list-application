const express = require("express");

// Middlewares
// const TaskController = require("../todo-list-app-server/controller/TaskController");

const PORT = 3000;
const app = express();

app.use(express.json());
//app.use("/todos", TaskController);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
