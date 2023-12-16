const express = require("express");
const router = express.Router();
const MainListService = require("../service/MainListService");

// GET all lists
router.get("/", async (req, res) => {
    try {
      const lists = await MainListService.getAllLists();
      res.status(200).json(lists);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // GET list by id
  router.get("/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const list = await MainListService.getListById(id);
      if (!list) {
        res.status(404).json({ message: "List not found." });
      } else {
        res.status(200).json(list);
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // POST create list
  router.post("/", async (req, res) => {
    const listData = req.body;
    try {
      const newList = await MainListService.createList(listData);
      res.status(201).json(newList);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  // UPDATE list
  router.put("/:id", async (req, res) => {
    const id = req.params.id;
    const updatedListData = req.body;
    try {
      const updatedListResult = await MainListService.updateList(id, updatedListData);
      res.status(200).json(updatedListResult);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  // PATCH list
  router.patch("/:id", async (req, res) => {
    const id = req.params.id;
    const updatedListData = req.body;
    try {
      const updatedListResult = await MainListService.patchList(id, updatedListData);
      res.status(200).json(updatedListResult);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  
  // DELETE list by id
  router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const deletedList = await MainListService.deleteListById(id);
      if (!deletedList) {
        res.status(404).json({ message: "List not found." });
      } else {
        res.status(200).json({ message: "List deleted successfully." });
      }
    } catch (err) {
      res.status(500).json({ message: "Error deleting list." });
    }
  });
  
  module.exports = router;
  