const express = require("express");
// const session = require("express-session");
const userRouter = require("./controller/UserController.js");
const taskRouter = require("./controller/TaskController.js");
const collectionRouter = require("./controller/CollectionController.js");
const priorityRouter = require("./controller/PriorityController.js");
const mediaBlobRouter = require("./controller/MediaBlobController.js");
const cors = require("cors");

const app = express();

app.use(cors());

const PORT = 3001;

app.use(express.json());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/tasks", taskRouter);
app.use("/api/v1/collections", collectionRouter);
app.use("/api/v1/priorities", priorityRouter);
app.use("/api/v1/mediablobs", mediaBlobRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
