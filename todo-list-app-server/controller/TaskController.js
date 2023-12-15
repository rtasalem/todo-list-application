const express = require("express");
const router = express.Router();
const TaskService = require("../service/TaskService");

// GET all tasks:
router.get('/', async (req, res) => {
    try {
        const tasks = await TaskService.getAllTasks();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET task by id:
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const task = await TaskService.getTaskById(id);
        if (!task) {
            res.status(404).json({ message: `Task with id of ${id} not found.` });
        }
        res.status(200).json(task);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
});

// POST create task:
router.post('/', async (req, res) => {
    const taskData = req.body;
    try {
        const newTask = await TaskService.createTask(taskData);
        if (newTask) {
            res.status(201).json(newTask);
        }
    } catch (err) {
        res.status(500).json({ message: "Error creating task." });
    }
});

// UPDATE task:
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const updatedTaskData = req.body;
    try {
        const updatedTaskResult = await TaskService.updateTask(id, updatedTaskData);
        if (updatedTaskData) {
            res.status(200).json(updatedTaskResult);
        }
        res.status(404).json({ message: `Task with id of ${id} not found.` })
    } catch (err) {
        res.status(500).json({ message: "Error updating task." });
    }
});

// DELETE task by id:
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const deletedTask = await TaskService.deleteTaskById(id);
        if (!deletedTask) {
            return res.status(404).json({ message: `Task with id of ${id} not found.` });
        }
        res.status(200).json({ message: `Task with id of ${id} deleted successfully.` });
    } catch (err) {
        res.status(500).json({ message: "Error deleting task." });
    }
});

module.exports = router;