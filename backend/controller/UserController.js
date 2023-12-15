const express = require("express");
const router = express.Router();
const UserService = require("../service/UserService");
// const checkLoggedIn = require("../middleware/authenticate");

// GET all users:
router.get("/", async (req, res) => {
  try {
    const users = await UserService.getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET user by id:
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await UserService.getUserById(id);
    if (!user) {
      res.status(404).json({ message: "User not found." });
    } else {
      res.status(200).json(user);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create user:
router.post("/", async (req, res) => {
  const userData = req.body;
  try {
    const newUser = await UserService.createUser(userData);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// UPDATE user:
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const updatedUserData = req.body;
  try {
    const updatedUserResult = await UserService.updateUser(id, updatedUserData);
    res.status(200).json(updatedUserResult);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PATCH user:
router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const updatedUserData = req.body;
  try {
    const updatedUserResult = await UserService.patchUser(id, updatedUserData);
    res.status(200).json(updatedUserResult);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE user by id:
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const deletedUser = await UserService.deleteUserById(id);
    if (!deletedUser) {
      res.status(404).json({ message: "User not found." });
    } else {
      res.status(200).json({ message: "User deleted successfully." });
    }
  } catch (err) {
    res.status(500).json({ message: "Error deleting user." });
  }
});

module.exports = router;
