const { MainList } = require('../database/associations.js');

const MainListService = {

    // Get all lists
    async getAllLists() {
        try {
            const lists = await MainList.findAll();
            return lists;
        } catch (err) {
            console.error("Error fetching lists:", err.message);
        }
    },

    // Get list by id
    async getListById(id) {
        try {
        const list = await MainList.findByPk(id);
        if (!list) {
            throw new Error("List not found.");
        }
        return list;
        } catch (err) {
        console.error("Error fetching list by id:", err.message);
        throw err;
        }
    },

    // Create list
    async createList(listData) {
        try {
        const newList = await List.create(listData);
        return newList;
        } catch (err) {
        console.error("Error creating list:", err.message);
        throw err;
        }
    },

    // Patch list
    async patchList(id, patchedListData) {
        try {
          const list = await List.findByPk(id);
          if (!list) {
            throw new Error("List not found.");
          }
    
          // Update only the specified fields
          await list.update(patchedListData);
          return list;
        } catch (err) {
          console.error("Error patching list:", err.message);
          throw err;
        }
      },

    // Delete list
    async deleteListById(id) {
        try {
        const list = await List.findByPk(id);
        if (!list) {
            throw new Error("List not found.");
        }
        await list.destroy();
        return { message: "List successfully deleted." };
        } catch (err) {
        console.error("Error deleting list:", err.message);
        throw err;
        }
    },

};

module.export = MainListService;