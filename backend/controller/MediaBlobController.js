const express = require("express");
const router = express.Router();
const MediaBlobService = require("../service/MediaBlobService");

// GET all mediaBlobs:
router.get("/", async (req, res) => {
  try {
    const mediaBlobs = await MediaBlobService.getAllMediaBlobs();
    res.status(200).json(mediaBlobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET mediaBlob by id:
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const mediaBlob = await MediaBlobService.getMediaBlobById(id);
    if (!mediaBlob) {
      res.status(404).json({ message: "MediaBlob not found." });
    } else {
      res.status(200).json(mediaBlob);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create mediaBlob:
router.post("/", async (req, res) => {
  const mediaBlobData = req.body;
  try {
    const newMediaBlob = await MediaBlobService.createMediaBlob(mediaBlobData);
    res.status(201).json(newMediaBlob);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// UPDATE mediaBlob:
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const updatedMediaBlobData = req.body;
  try {
    const updatedMediaBlobResult = await MediaBlobService.updateMediaBlob(
      id,
      updatedMediaBlobData
    );
    res.status(200).json(updatedMediaBlobResult);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PATCH mediaBlob:
router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const updatedMediaBlobData = req.body;
  try {
    const updatedMediaBlobResult = await MediaBlobService.patchMediaBlob(
      id,
      updatedMediaBlobData
    );
    res.status(200).json(updatedMediaBlobResult);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE mediaBlob by id:
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const deletedMediaBlob = await MediaBlobService.deleteMediaBlobById(id);
    if (!deletedMediaBlob) {
      res.status(404).json({ message: "MediaBlob not found." });
    } else {
      res.status(200).json({ message: "MediaBlob deleted successfully." });
    }
  } catch (err) {
    res.status(500).json({ message: "Error deleting mediaBlob." });
  }
});

module.exports = router;
