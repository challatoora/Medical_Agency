const express = require("express");

const router = express.Router();

const userController = require("../controllers/userController");


// Register
router.post("/register", userController.registerUser);


// Login
router.post("/login", userController.loginUser);


// Get All Users
router.get("/", userController.getAllUsers);


// Get User By ID
router.get("/:id", userController.getUserById);


// Update User
router.put("/:id", userController.updateUser);


// Delete User
router.delete("/:id", userController.deleteUser);


module.exports = router;