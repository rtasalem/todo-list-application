const express = require("express");
const router = express.Router();
const UserService = require("../service/UserService");
const handleError = require("../middleware/handleError.js");

router.use(handleError);

// GET logout user:
router.get("/logout", async (req, res, next) => {
  try {
    req.session.destroy(function () {
      res.status(200).json({ message: "Logout successful." });
    });
  } catch (err) {
    next(err);
  }
});

// GET all users:
router.get("/", async (req, res, next) => {
  try {
    const users = await UserService.getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});

// GET user by id:
router.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    const user = await UserService.getUserById(id);
    if (!user) {
      res.status(404).json({ message: "User not found." });
    } else {
      res.status(200).json(user);
    }
  } catch (err) {
    next(err);
  }
});

// POST register user:
router.post("/signup", async (req, res, next) => {
  try {
    const { email, password, first_name, last_name = null } = req.body;
    if (!email || !password || !first_name) {
      return res
        .status(400)
        .json({ message: "Please fill in all required fields." });
    }
    const newUser = await UserService.createUser({
      email,
      password,
      first_name,
      last_name,
    });
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
});

// POST login user:
router.post("/login", async (req, res, next) => {
  try {
    const user = req.body;

    const [validCredentials, userId] = await UserService.validateCredentials(
      user
    );

    if (validCredentials) {
      req.session.userId = userId;
      res.status(200).json({ message: "Login successful." });
    } else {
      res.status(401).json({ message: "Invalid credentials." });
    }
  } catch (err) {
    next(err);
  }
});

// UPDATE user:
router.put("/:id", async (req, res, next) => {
  const id = req.params.id;
  const updatedUserData = req.body;
  try {
    const updatedUserResult = await UserService.updateUser(id, updatedUserData);
    res.status(200).json(updatedUserResult);
  } catch (err) {
    next(err);
  }
});

// PATCH user:
router.patch("/:id", async (req, res, next) => {
  const id = req.params.id;
  const updatedUserData = req.body;
  try {
    const updatedUserResult = await UserService.patchUser(id, updatedUserData);
    res.status(200).json(updatedUserResult);
  } catch (err) {
    next(err);
  }
});

// DELETE user by id:
router.delete("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    const deletedUser = await UserService.deleteUserById(id);
    if (!deletedUser) {
      res.status(404).json({ message: "User not found." });
    } else {
      res.status(200).json({ message: "User deleted successfully." });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
