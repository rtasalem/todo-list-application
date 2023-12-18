const { User } = require("../database/associations.js");

const UserService = {
  // Get all users
  async getAllUsers() {
    try {
      const tasks = await User.findAll();
      return tasks;
    } catch (err) {
      console.error("Error fetching users:", err.message);
      throw err;
    }
  },

  async getUserById(userId) {
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        throw new Error("User not found.");
      }
      return user;
    } catch (err) {
      console.error("Error fetching user by id:", err.message);
      throw err;
    }
  },

  async createUser(userData) {
    try {
      const newUser = await User.create(userData);
      return newUser;
    } catch (err) {
      console.error("Error creating user:", err.message);
      throw err;
    }
  },

  async updateUser(userId, updatedUserData) {
    const user = await User.findByPk(userId);
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        throw new Error("User not found.");
      } else {
        await user.update(updatedTaskData);
        return user;
      }
    } catch (err) {
      console.error("Error updating user:", err.message);
      throw err;
    }
  },

  async patchUser(userId, updatedUserData) {
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        throw new Error("User not found.");
      } else {
        await user.update(patchedUserData);
        return user;
      }
    } catch (err) {
      console.error("Error patching user:", err.message);
      throw err;
    }
  },

  async deleteUserById(userId) {
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        return null;
      }
      await user.destroy();
      return { message: "User successfully deleted." };
    } catch (err) {
      console.error("Error deleting user:", err.message);
      throw err;
    }
  },
};

module.exports = UserService;
