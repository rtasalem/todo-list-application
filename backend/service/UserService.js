const { User } = require("../database/associations.js");

const UserService = {
  async getAllUsers() {
    return await User.findAll();
  },

  async getUserById(userId) {
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        throw { message: "User not found.", status: 404 };
      }
      return user;
    } catch (err) {
      throw { message: err.message, status: 500 };
    }
  },

  async createUser(userData) {
    try {
      const { email, password, first_name, last_name = null } = userData;
      const existingUser = await User.findOne({ where: { email: email } });
      if (existingUser) {
        throw { message: "User already exists for this email.", status: 409 };
      }
      return await User.create({ email, password, first_name, last_name });
    } catch (err) {
      throw { message: err.message, status: 500 };
    }
  },

  async validateCredentials(userData) {
    const { email, password } = userData;
    try {
      const user = await User.findOne({ where: { email: email } });
      if (!user) {
        throw { message: "User not found.", status: 401 };
      }
      const validPassword = user && password === user.password;
      return [validPassword, user.id];
    } catch (err) {
      throw { message: err.message, status: 500 };
    }
  },

  async updateUser(userId, updatedUserData) {
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        throw new Error("User not found.");
      } else {
        await user.update(updatedUserData);
        return user;
      }
    } catch (err) {
      throw { message: err.message, status: 500 };
    }
  },

  async patchUser(userId, patchedUserData) {
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        throw new Error("User not found.");
      } else {
        await user.update(patchedUserData);
        return user;
      }
    } catch (err) {
      throw { message: err.message, status: 500 };
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
      throw { message: err.message, status: 500 };
    }
  },
};

module.exports = UserService;
