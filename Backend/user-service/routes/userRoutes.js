const express = require("express");

const router = express.Router();

const userController = require("../controllers/userController");

// ==============================
// CREATE USER
// POST /api/users
// ==============================
router.post("/", userController.createUser);


// ==============================
// REGISTER USER
// POST /api/users/register
// ==============================
router.post("/register", userController.registerUser);


// ==============================
// LOGIN USER
// POST /api/users/login
// ==============================
router.post("/login", userController.loginUser);


// ==============================
// GET ALL USERS
// GET /api/users
// ==============================
router.get("/", userController.getAllUsers);


// ==============================
// GET USER BY ID
// GET /api/users/:id
// ==============================
router.get("/:id", userController.getUserById);


// ==============================
// UPDATE USER
// PUT /api/users/:id
// ==============================
router.put("/:id", userController.updateUser);


// ==============================
// DELETE USER
// DELETE /api/users/:id
// ==============================
router.delete("/:id", userController.deleteUser);


module.exports = router;