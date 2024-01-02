const express = require("express");
const router = express.Router();
const CollectionService = require("../service/CollectionService");
const checkLogin = require("../middleware/checkLogin.js");
const handleError = require("../middleware/handleError.js");

router.use(handleError);

// GET all collections:
router.get("/", async (req, res) => {
  try {
    const collections = await CollectionService.getAllCollections();
    res.status(200).json(collections);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET collection by id:
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const collection = await CollectionService.getCollectionById(id);
    if (!collection) {
      res.status(404).json({ message: "Collection not found." });
    } else {
      res.status(200).json(collection);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create collection:
router.post("/", async (req, res) => {
  const collectionData = req.body;
  try {
    const newCollection = await CollectionService.createCollection(
      collectionData
    );
    res.status(201).json(newCollection);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// UPDATE collection:
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const updatedCollectionData = req.body;
  try {
    const updatedCollectionResult = await CollectionService.updateCollection(
      id,
      updatedCollectionData
    );
    res.status(200).json(updatedCollectionResult);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PATCH collection:
router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const updatedCollectionData = req.body;
  try {
    const updatedCollectionResult = await CollectionService.patchCollection(
      id,
      updatedCollectionData
    );
    res.status(200).json(updatedCollectionResult);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE collection by id:
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const deletedCollection = await CollectionService.deleteCollectionById(id);
    if (!deletedCollection) {
      res.status(404).json({ message: "Collection not found." });
    } else {
      res.status(200).json({ message: "Collection deleted successfully." });
    }
  } catch (err) {
    res.status(500).json({ message: "Error deleting collection." });
  }
});

module.exports = router;
