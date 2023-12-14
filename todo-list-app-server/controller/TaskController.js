const express = require("express");
const router = express.Router();
const TaskService = require("../service/TaskService");

router.get('/', async (req, res) => {
    try {
        const tasks = await TaskService.getAllTasks();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const task = await TaskService.getTaskById(id);
        res.json(task);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
});

router.post('/', async (req, res) => {
    const taskData = req.body;
    try {
        const newTask = await TaskService.createTask(taskData);
        res.status(201).json(newTask);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const updatedTask = req.body;
    try {
        const updatedTask = await TaskService.updateTask(id, updatedTask);
        res.json(updatedTask);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const result = await TaskService.deleteTask(id);
        res.json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;