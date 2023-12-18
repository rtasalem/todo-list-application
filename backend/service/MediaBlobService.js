const { MediaBlob } = require("../database/associations.js");

const MediaBlobService = {
  //Get all Media:
  async getAllTasks() {
    try {
      const media = await MediaBlob.findAll();
      return media;
    } catch (err) {
      console.error("Error fetching media: ", err.message);
      throw err;
    }
  },

  //Get Media by Id:
  async getMediaById(id) {
    try {
      const media = await MediaBlob.findByPk(id);
      if (!media) {
        throw new Error("Media not found.");
      }
      return media;
    } catch (err) {
      console.error("Error fetching media by id");
      throw err;
    }
  },

  //Create Media:
  async createMedia(mediaData) {
    try {
      const newMedia = await MediaBlob.create(mediaData);
      return newMedia;
    } catch (err) {
      console.error("Error creating media: ", err.message);
      throw err;
    }
  },

  //Update Media:
  async updateMedia(id, updatedMediaData) {
    try {
      const media = await MediaBlob.findByPk(id);
      if (!media) {
        throw new Error("Media not found");
      }
      await media.update(updatedMediaData);
      return media;
    } catch (err) {
      console.error("Error updating Media: ", err.message);
      throw err;
    }
  },

  //Patch Media:
  async patchMedia(id, patchedMediaData) {
    try {
      const media = await MediaBlob.findByPk(id);
      if (!media) {
        throw new Error("Media not found");
      }
      await media.update(patchedMediaData);
      return media;
    } catch (err) {
      console.error("Error patching task: ", err.message);
      throw err;
    }
  },

  //Delete Media:
  async deleteMedia(id) {
    try {
      const media = await MediaBlob.findByPk(id);
      if (!media) {
        throw new Error("Media not found");
      }
      await media.destroy();
      return { message: "Media successfully deleted." };
    } catch (err) {
      console.error("Error deleting task", err.message);
      throw err;
    }
  },
};

module.exports = MediaBlobService;
