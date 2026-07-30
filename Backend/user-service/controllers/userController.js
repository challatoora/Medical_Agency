const userModel = require("../models/userModel");


// Get All Users
const getAllUsers = (req, res) => {

    userModel.getAllUsers((err, results) => {

        if (err) {
            console.error("Get All Users Error:", err);

            return res.status(500).json({
                message: "Failed to fetch users"
            });
        }

        res.status(200).json(results);
    });
};


// Get User By ID
const getUserById = (req, res) => {

    const { id } = req.params;

    userModel.getUserById(id, (err, results) => {

        if (err) {
            console.error("Get User Error:", err);

            return res.status(500).json({
                message: "Failed to fetch user"
            });
        }

        if (results.length === 0) {

            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json(results[0]);
    });
};


// Register User
const registerUser = (req, res) => {

    const {
        name,
        email,
        phone,
        password,
        role
    } = req.body;


    // Basic validation
    if (!name || !email || !password) {

        return res.status(400).json({
            message: "Name, email and password are required"
        });
    }


    // Check if email already exists
    userModel.findUserByEmail(email, (err, results) => {

        if (err) {
            console.error("Find User Error:", err);

            return res.status(500).json({
                message: "Database error"
            });
        }


        if (results.length > 0) {

            return res.status(409).json({
                message: "Email already registered"
            });
        }


        const user = {
            name,
            email,
            phone,
            password,
            role: role || "user"
        };


        userModel.createUser(user, (err, result) => {

            if (err) {
                console.error("Create User Error:", err);

                return res.status(500).json({
                    message: "Failed to register user"
                });
            }


            res.status(201).json({

                message: "User registered successfully",

                userId: result.insertId

            });
        });
    });
};


// Login User
const loginUser = (req, res) => {

    const {
        email,
        password
    } = req.body;


    if (!email || !password) {

        return res.status(400).json({
            message: "Email and password are required"
        });
    }


    userModel.findUserByEmail(email, (err, results) => {

        if (err) {
            console.error("Login Database Error:", err);

            return res.status(500).json({
                message: "Database error"
            });
        }


        if (results.length === 0) {

            return res.status(401).json({
                message: "Invalid email or password"
            });
        }


        const user = results[0];


        // Simple password comparison
        if (password !== user.password) {

            return res.status(401).json({
                message: "Invalid email or password"
            });
        }


        res.status(200).json({

            message: "Login successful",

            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
                created_at: user.created_at,
                updated_at: user.updated_at
            }
        });
    });
};


// Update User
const updateUser = (req, res) => {

    const { id } = req.params;

    const {
        name,
        email,
        phone,
        role
    } = req.body;


    if (!name || !email) {

        return res.status(400).json({
            message: "Name and email are required"
        });
    }


    const user = {
        name,
        email,
        phone,
        role
    };


    userModel.updateUser(id, user, (err, result) => {

        if (err) {
            console.error("Update User Error:", err);

            return res.status(500).json({
                message: "Failed to update user"
            });
        }


        if (result.affectedRows === 0) {

            return res.status(404).json({
                message: "User not found"
            });
        }


        res.status(200).json({

            message: "User updated successfully"

        });
    });
};


// Delete User
const deleteUser = (req, res) => {

    const { id } = req.params;


    userModel.deleteUser(id, (err, result) => {

        if (err) {
            console.error("Delete User Error:", err);

            return res.status(500).json({
                message: "Failed to delete user"
            });
        }


        if (result.affectedRows === 0) {

            return res.status(404).json({
                message: "User not found"
            });
        }


        res.status(200).json({

            message: "User deleted successfully"

        });
    });
};


module.exports = {
    getAllUsers,
    getUserById,
    registerUser,
    loginUser,
    updateUser,
    deleteUser
};