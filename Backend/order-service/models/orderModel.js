const db = require("../config/db");

// ==============================
// GET ORDERS
// ==============================

const getAllOrders = (userId, callback) => {

    let sql = `
        SELECT *
        FROM orders
    `;

    let params = [];

    if (userId) {
        sql += ` WHERE user_id = ?`;
        params.push(userId);
    }

    sql += ` ORDER BY id DESC`;

    db.query(sql, params, callback);
};


// ==============================
// GET ORDER BY ID
// ==============================

const getOrderById = (id, callback) => {

    const sql = `
        SELECT *
        FROM orders
        WHERE id = ?
    `;

    db.query(sql, [id], (err, results) => {

        if (err) {
            return callback(err);
        }

        if (results.length === 0) {
            return callback(null, null);
        }

        callback(null, results[0]);

    });

};


// ==============================
// CREATE ORDER
// ==============================

const createOrder = (order, callback) => {

    const {
        user_id,
        customer_name,
        medicine_name,
        quantity,
        total_price,
        status
    } = order;

    const sql = `
        INSERT INTO orders
        (
            user_id,
            customer_name,
            medicine_name,
            quantity,
            total_price,
            status
        )
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            user_id,
            customer_name,
            medicine_name,
            quantity,
            total_price,
            status || "Pending"
        ],
        callback
    );

};


// ==============================
// UPDATE ORDER
// ==============================

const updateOrder = (id, order, callback) => {

    const {
        customer_name,
        medicine_name,
        quantity,
        total_price,
        status
    } = order;

    const sql = `
        UPDATE orders
        SET
            customer_name = ?,
            medicine_name = ?,
            quantity = ?,
            total_price = ?,
            status = ?
        WHERE id = ?
    `;

    db.query(
        sql,
        [
            customer_name,
            medicine_name,
            quantity,
            total_price,
            status,
            id
        ],
        callback
    );

};


// ==============================
// DELETE ORDER
// ==============================

const deleteOrder = (id, callback) => {

    db.query(
        "DELETE FROM orders WHERE id = ?",
        [id],
        callback
    );

};


module.exports = {
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder
};