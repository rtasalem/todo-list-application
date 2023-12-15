// const TaskPriority = require("../model/TaskPriority");
// const sequelize = require("../server");

// sequelize
//     .authenticate()
//     .then(() => {
//         console.log("Connection has been established successfully.");

//         TaskPriority.create({
//             name: "fijrbeigvjbre",
//             color: "Yellow",
//             taskId: 1
//         })
//             .then((res) => {
//                 console.log(res);
//             })
//             .catch((error) => {
//                 console.error("Failed to create a new record : ", error);
//             });
//     })
//     .catch((error) => {
//         console.error("Unable to connect to the database: ", error);
//     });


const express = require('express');
const router = express.Router();
const TaskPriorityService = require ('../service/TaskPriorityService');


    // get/read
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const priority = await TaskPriorityService.getTaskPriorityById(id);
        if (!priority) {
            res.status(404).json({ message: `Task Priority with id of ${id} not found.` });
        }
        res.status(200).json(priority);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

    // update (change priority)
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const updatedTaskPriority = req.body;
    
    try {
        const updatedPriority = await TaskPriorityService.updateTaskPriority(id, updatedTaskPriority);
        res.status(200).json(updatedPriority);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message});
    }
    });

    // delete
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const deleteTask = await TaskPriorityService.deleteTaskPriorityById(id);
        if (!deleteTask) {
            return res.status(404).json({ message: `Task with id of ${id} not found.` });
        }
        res.status(200).json({ message: `Task Priority with id of ${id} has been deleted.` });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error deleting task." });
    }
});

