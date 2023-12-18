const express = require("express");
const router = express.Router();
const PriorityService = require("../service/PriorityService");

// GET all priorities:
router.get("/", async (req, res) => {
  try {
    const priorities = await PriorityService.getAllPriorities();
    res.status(200).json(priorities);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET priority by id:
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const priority = await PriorityService.getPriorityById(id);
    if (!priority) {
      res.status(404).json({ message: "Priority not found." });
    } else {
      res.status(200).json(priority);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create priority:
router.post("/", async (req, res) => {
  const priorityData = req.body;
  try {
    const newPriority = await PriorityService.createPriority(priorityData);
    res.status(201).json(newPriority);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// UPDATE priority:
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const updatedPriorityData = req.body;
  try {
    const updatedPriorityResult = await PriorityService.updatePriority(
      id,
      updatedPriorityData
    );
    res.status(200).json(updatedPriorityResult);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PATCH priority:
router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const updatedPriorityData = req.body;
  try {
    const updatedPriorityResult = await PriorityService.patchPriority(
      id,
      updatedPriorityData
    );
    res.status(200).json(updatedPriorityResult);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE priority by id:
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const deletedPriority = await PriorityService.deletePriorityById(id);
    if (!deletedPriority) {
      res.status(404).json({ message: "Priority not found." });
    } else {
      res.status(200).json({ message: "Priority deleted successfully." });
    }
  } catch (err) {
    res.status(500).json({ message: "Error deleting priority." });
  }
});

module.exports = router;
