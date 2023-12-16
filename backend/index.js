const express = require("express");
const cors = require("cors");
// const session = require("express-session");
const taskRouter = require("./controller/TaskController.js");
const userRouter = require("./controller/UserController.js");

const app = express();

app.use(cors())

const PORT = 3000;

app.use(express.json());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/tasks", taskRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
