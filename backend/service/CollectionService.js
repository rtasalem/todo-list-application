const { Collection } = require("../database/associations.js");

const CollectionService = {
  async getAllCollections() {
    try {
      const tasks = await Collection.findAll();
      return tasks;
    } catch (err) {
      console.error("Error fetching collections:", err.message);
      throw err;
    }
  },

  async getCollectionById(collectionId) {
    try {
      const collection = await Collection.findByPk(collectionId);
      if (!collection) {
        throw new Error("Collection not found.");
      } else {
        return collection;
      }
    } catch (err) {
      console.error("Error fetching collection by id:", err.message);
      throw err;
    }
  },

  async createCollection(collectionData) {
    try {
      const newCollection = await Collection.create(collectionData);
      return newCollection;
    } catch (err) {
      console.error("Error creating collection:", err.message);
      throw err;
    }
  },

  async updateCollection(collectionId, updatedCollectionData) {
    try {
      const collection = await Collection.findByPk(collectionId);
      if (!collection) {
        throw new Error("Collection not found.");
      } else {
        await collection.update(updatedCollectionData);
        return collection;
      }
    } catch (err) {
      console.error("Error updating collection:", err.message);
      throw err;
    }
  },

  async patchCollection(collectionId, patchedCollectionData) {
    try {
      const collection = await Collection.findByPk(collectionId);
      if (!collection) {
        throw new Error("Collection not found.");
      } else {
        await collection.update(patchedCollectionData);
        return collection;
      }
    } catch (err) {
      console.error("Error patching collection:", err.message);
      throw err;
    }
  },

  async deleteCollectionById(collectionId) {
    try {
      const collection = await Collection.findByPk(collectionId);
      if (!collection) {
        return null;
      }
      await collection.destroy();
      return { message: "Collection successfully deleted." };
    } catch (err) {
      console.error("Error deleting collection:", err.message);
      throw err;
    }
  },
};

module.exports = CollectionService;
