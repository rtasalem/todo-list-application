const express = require("express");
const router = express.Router();
const TaskService = require("../service/TaskServce");

router.post('/todos', async (req, res) => {
    try {
        const taskData = req.body;
        const newTask = await TaskService.createTask(taskData);
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;