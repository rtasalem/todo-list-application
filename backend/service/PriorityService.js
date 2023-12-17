const { Priority } = require("../database/associations.js");

const PriorityService = {
  async getAllPriorities() {
    try {
      const tasks = await Priority.findAll();
      return tasks;
    } catch (err) {
      console.error("Error fetching priorities:", err.message);
      throw err;
    }
  },

  async getPriorityById(priorityId) {
    try {
      const priority = await Priority.findByPk(priorityId);
      if (!priority) {
        throw new Error("Priority not found.");
      }
      return priority;
    } catch (err) {
      console.error("Error fetching priority by id:", err.message);
      throw err;
    }
  },

  async createPriority(priorityData) {
    try {
      const newPriority = await Priority.create(priorityData);
      return newPriority;
    } catch (err) {
      console.error("Error creating priority:", err.message);
      throw err;
    }
  },

  async updatePriority(priorityId, updatedPriorityData) {
    try {
      const priority = await Priority.findByPk(priorityId);
      if (!priority) {
        throw new Error("Priority not found.");
      } else {
        await priority.update(updatedPriorityData);
        return priority;
      }
    } catch (err) {
      console.error("Error updating priority:", err.message);
      throw err;
    }
  },

  async patchPriority(priorityId, patchedPriorityData) {
    try {
      const priority = await Priority.findByPk(priorityId);
      if (!priority) {
        throw new Error("Priority not found.");
      } else {
        await priority.update(patchedPriorityData);
        return priority;
      }
    } catch (err) {
      console.error("Error patching priority:", err.message);
      throw err;
    }
  },

  async deletePriorityById(priorityId) {
    try {
      const priority = await Priority.findByPk(priorityId);
      if (!priority) {
        return null;
      }
      await priority.destroy();
      return { message: "Priority successfully deleted." };
    } catch (err) {
      console.error("Error deleting priority:", err.message);
      throw err;
    }
  },
};

module.exports = PriorityService;
