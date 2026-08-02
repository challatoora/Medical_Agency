const db = require("../config/db");

// ==============================
// GET ALL ORDERS
// ==============================

const getAllOrders = (callback) => {


const sql = `
    SELECT *
    FROM orders
    ORDER BY id DESC
`;

db.query(sql, callback);


};

// ==============================
// GET ORDERS BY USER ID
// ==============================

const getOrdersByUserId = (userId, callback) => {


const sql = `
    SELECT *
    FROM orders
    WHERE user_id = ?
    ORDER BY id DESC
`;

db.query(sql, [userId], callback);


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
    user_id,
    customer_name,
    medicine_name,
    quantity,
    total_price,
    status
} = order;

const sql = `
    UPDATE orders
    SET
        user_id = ?,
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
        user_id,
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


const sql = `
    DELETE FROM orders
    WHERE id = ?
`;

db.query(
    sql,
    [id],
    callback
);


};

// ==============================
// EXPORT
// ==============================

module.exports = {


getAllOrders,

getOrdersByUserId,

getOrderById,

createOrder,

updateOrder,

deleteOrder


};
