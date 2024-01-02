const express = require("express");
const session = require("express-session");
const { sessionStore } = require("./database/associations.js");
const cors = require("cors");
const taskRouter = require("./controller/TaskController.js");
const userRouter = require("./controller/UserController.js");
const mediaRouter = require("./controller/MediaBlobController.js");
const collectionRouter = require("./controller/CollectionController.js");
const priorityController = require("./controller/PriorityController.js");

const PORT = 8088;
const app = express();

app.use(
  session({
    secret: process.env.SESSION_SECRET_KEY || "keyboard cat",
    store: sessionStore,
    resave: true,
    saveUninitialized: true,
    store: sessionStore,
    cookie: { secure: false },
  })
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1/users", userRouter);
app.use("/api/v1/tasks", taskRouter);
app.use("/api/v1/media", mediaRouter);
app.use("/api/v1/collections", collectionRouter);
app.use("/api/v1/priorities", priorityController);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
