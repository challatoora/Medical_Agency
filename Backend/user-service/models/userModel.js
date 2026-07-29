const db = require("../config/db");


// Get All Users
const getAllUsers = (callback) => {

    const sql = `
        SELECT id, full_name, email, phone, role, status, created_at
        FROM users
        ORDER BY id DESC
    `;

    db.query(sql, callback);
};


// Get User By ID
const getUserById = (id, callback) => {

    const sql = `
        SELECT id, full_name, email, phone, role, status, created_at
        FROM users
        WHERE id = ?
    `;

    db.query(sql, [id], callback);
};


// Create User
const createUser = (user, callback) => {

    const sql = `
        INSERT INTO users
        (full_name, email, phone, password, role, status)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    const values = [
        user.full_name,
        user.email,
        user.phone,
        user.password,
        user.role,
        user.status
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
        SET full_name = ?,
            email = ?,
            phone = ?,
            role = ?,
            status = ?
        WHERE id = ?
    `;

    const values = [
        user.full_name,
        user.email,
        user.phone,
        user.role,
        user.status,
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