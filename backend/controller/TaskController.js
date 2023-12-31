const express = require("express");
const router = express.Router();
const TaskService = require("../service/TaskService");
const Priority = require("../database/model/Priority");

// GET all tasks:
router.get("/", async (req, res) => {
  try {
    const tasks = await TaskService.getAllTasks();
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET task by id:
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const task = await TaskService.getTaskById(id);
    if (!task) {
      res.status(404).json({ message: "Task not found." });
    } else {
      res.status(200).json(task);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create task:
router.post("/", async (req, res) => {
  const taskData = req.body;
  try {
    const newTask = await TaskService.createTask(taskData);
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// UPDATE task:
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const updatedTaskData = req.body;
  try {
    const updatedTaskResult = await TaskService.updateTask(id, updatedTaskData);
    res.status(200).json(updatedTaskResult);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PATCH task:
router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const updatedTaskData = req.body;
  try {
    const updatedTaskResult = await TaskService.patchTask(id, updatedTaskData);
    res.status(200).json(updatedTaskResult);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE task by id:
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const deletedTask = await TaskService.deleteTaskById(id);
    if (!deletedTask) {
      res.status(404).json({ message: "Task not found." });
    } else {
      res.status(200).json({ message: "Task deleted successfully." });
    }
  } catch (err) {
    res.status(500).json({ message: "Error deleting task." });
  }
});

//get a priority by taskId
router.get("/priority/:taskId", async (req, res) => {
  const taskId = req.params.taskId;

  try {
    const priority = await TaskService.getPriorityByTaskId(taskId);

    if (!priority) {
      res
        .status(404)
        .json({ message: "Priority not found for the given taskId." });
    } else {
      res.status(200).json(priority);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
