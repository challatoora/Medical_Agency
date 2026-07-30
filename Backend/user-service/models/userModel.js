const db = require("../config/db");

// Get All Users
const getAllUsers = (callback) => {

    const sql = `
        SELECT 
            id,
            name,
            email,
            phone,
            role,
            created_at,
            updated_at
        FROM users
        ORDER BY id DESC
    `;

    db.query(sql, callback);
};


// Get User By ID
const getUserById = (id, callback) => {

    const sql = `
        SELECT 
            id,
            name,
            email,
            phone,
            role,
            created_at,
            updated_at
        FROM users
        WHERE id = ?
    `;

    db.query(sql, [id], callback);
};


// Create User
const createUser = (user, callback) => {

    const sql = `
        INSERT INTO users
        (name, email, password, phone, role)
        VALUES (?, ?, ?, ?, ?)
    `;

    const values = [
        user.name,
        user.email,
        user.password,
        user.phone || null,
        user.role || "user"
    ];

    db.query(sql, values, callback);
};


// Find User By Email
const findUserByEmail = (email, callback) => {

    const sql = `
        SELECT *
        FROM users
        WHERE email = ?
    `;

    db.query(sql, [email], callback);
};


// Update User
const updateUser = (id, user, callback) => {

    const sql = `
        UPDATE users
        SET 
            name = ?,
            email = ?,
            phone = ?,
            role = ?
        WHERE id = ?
    `;

    const values = [
        user.name,
        user.email,
        user.phone || null,
        user.role || "user",
        id
    ];

    db.query(sql, values, callback);
};


// Delete User
const deleteUser = (id, callback) => {

    const sql = `
        DELETE FROM users
        WHERE id = ?
    `;

    db.query(sql, [id], callback);
};


module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    findUserByEmail,
    updateUser,
    deleteUser
};