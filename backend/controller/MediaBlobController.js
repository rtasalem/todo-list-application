const express = require("express");
const router = express.Router();
const multer = require("multer");
const MediaBlobService = require("../service/MediaBlobService.js");
const handleError = require("../middleware/handleError.js");
const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const dotenv = require("dotenv");
const crypto = require("crypto");

dotenv.config();

const randomFileName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const bucketName = process.env.BUCKET_NAME;

const s3 = new S3Client({
  region: process.env.BUCKET_REGION,
});

router.use(handleError);

//GET all Media:
router.get("/", async (req, res) => {
  try {
    const media = await MediaBlobService.getAllTasks();
    for (let medias of media) {
      const getObjectParams = {
        Bucket: bucketName,
        Key: medias.name,
      };
      const command = new GetObjectCommand(getObjectParams);
      const url = await getSignedUrl(s3, command, {
        expiresIn: 3600,
        queryParams: { "response-content-disposition": "inline" },
      });
      medias.mediaUrl = url;
    }
    res.status(200).json(media);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//GET Media by ID:
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const media = await MediaBlobService.getMediaById(id);

    if (!media) {
      return res.status(404).send("Media not found.");
    }

    const getObjectParams = {
      Bucket: bucketName,
      Key: media.name,
    };

    const command = new GetObjectCommand(getObjectParams);
    const url = await getSignedUrl(s3, command, {
      expiresIn: 3600,
      queryParams: { "response-content-disposition": "inline" },
    });
    media.mediaUrl = url;

    res.status(200).json({ media });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//POST create Media:
router.post("/", upload.single("media"), async (req, res) => {
  const { name, caption } = req.body;
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  const mimeType = req.file.mimetype;

  const fileKey = randomFileName();
  const params = {
    Bucket: bucketName,
    Key: fileKey,
    Body: req.file.buffer,
    ContentType: mimeType,
  };

  try {
    await s3.send(new PutObjectCommand(params));

    const mediaData = {
      name: fileKey,
      caption: req.body.caption,
      type: mimeType,
    };

    const newMedia = await MediaBlobService.createMedia(mediaData);
    res.status(201).json(newMedia);
  } catch (err) {
    console.error("Error: ", err);
    res.status(400).json({ error: err.message });
  }
});

//UPDATE Media:
router.put("/:id", upload.single("media"), async (req, res) => {
  const id = req.params.id;
  const updatedCaption = req.body.caption;
  try {
    let updatedMediaData = { caption: updatedCaption };

    if (req.file) {
      const fileKey = randomFileName();
      const mimeType = req.file.mimetype;

      const params = {
        Bucket: bucketName,
        Key: fileKey,
        Body: req.file.buffer,
        ContentType: mimeType,
      };

      await s3.send(new PutObjectCommand(params));
      updatedMediaData = {
        ...updatedMediaData,
        name: fileKey,
        type: mimeType,
      };
    }

    const updatedMediaResult = await MediaBlobService.updateMedia(
      id,
      updatedMediaData
    );
    res.status(200).json(updatedMediaResult);
  } catch (err) {
    console.error("Error: ", err);
    res.status(400).json({ error: err.message });
  }
});

// PATCH Media:
router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const updatedMediaData = req.body;
  try {
    const updatedMediaResult = await MediaBlobService.patchMedia(
      id,
      updatedMediaData
    );
    res.status(200).json(updatedMediaResult);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//DELETE media by id:
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const media = await MediaBlobService.getMediaById(id);
    if (!media) {
      res.status(404).json({ message: "Media not found." });
    } else {
      res.status(200).json({ message: "Media deleted successfully." });
    }
    const params = {
      Bucket: bucketName,
      Key: media.name,
    };

    const command = new DeleteObjectCommand(params);
    await s3.send(command);
    await MediaBlobService.deleteMedia(id);
  } catch (err) {
    res.status(500).json({ message: "Error deleting Media." });
  }
});

module.exports = router;
