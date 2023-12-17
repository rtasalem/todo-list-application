const { MediaBlob } = require("../database/associations.js");

const MediaBlobService = {
  async getAllMediaBlobs() {
    try {
      const tasks = await MediaBlob.findAll();
      return tasks;
    } catch (err) {
      console.error("Error fetching mediaBlobs:", err.message);
      throw err;
    }
  },

  async getMediaBlobById(mediaBlobId) {
    try {
      const mediaBlob = await MediaBlob.findByPk(mediaBlobId);
      if (!mediaBlob) {
        throw new Error("MediaBlob not found.");
      } else {
        return mediaBlob;
      }
    } catch (err) {
      console.error("Error fetching mediaBlob by id:", err.message);
      throw err;
    }
  },

  async createMediaBlob(mediaBlobData) {
    try {
      const newMediaBlob = await MediaBlob.create(mediaBlobData);
      return newMediaBlob;
    } catch (err) {
      console.error("Error creating mediaBlob:", err.message);
      throw err;
    }
  },

  async updateMediaBlob(mediaBlobId, updatedMediaBlobData) {
    try {
      const mediaBlob = await MediaBlob.findByPk(mediaBlobId);
      if (!mediaBlob) {
        throw new Error("MediaBlob not found.");
      } else {
        await mediaBlob.update(updatedMediaBlobData);
        return mediaBlob;
      }
    } catch (err) {
      console.error("Error updating mediaBlob:", err.message);
      throw err;
    }
  },

  async patchMediaBlob(mediaBlobId, patchedMediaBlobData) {
    try {
      const mediaBlob = await MediaBlob.findByPk(mediaBlobId);
      if (!mediaBlob) {
        throw new Error("MediaBlob not found.");
      } else {
        await mediaBlob.update(patchedMediaBlobData);
        return mediaBlob;
      }
    } catch (err) {
      console.error("Error patching mediaBlob:", err.message);
      throw err;
    }
  },

  async deleteMediaBlobById(mediaBlobId) {
    try {
      const mediaBlob = await MediaBlob.findByPk(mediaBlobId);
      if (!mediaBlob) {
        return null;
      }
      await mediaBlob.destroy();
      return { message: "MediaBlob successfully deleted." };
    } catch (err) {
      console.error("Error deleting mediaBlob:", err.message);
      throw err;
    }
  },
};

module.exports = MediaBlobService;
