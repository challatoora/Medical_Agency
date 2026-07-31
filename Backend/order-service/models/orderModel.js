// const db = require("../config/db");


// // Get All Orders
// const getAllOrders = (callback) => {

//     const sql = `
//         SELECT *
//         FROM orders
//         ORDER BY id DESC
//     `;

//     db.query(sql, callback);
// };


// // Get Order By ID
// const getOrderById = (id, callback) => {

//     const orderSql = `
//         SELECT *
//         FROM orders
//         WHERE id = ?
//     `;

//     const itemsSql = `
//         SELECT *
//         FROM order_items
//         WHERE order_id = ?
//     `;

//     db.query(orderSql, [id], (err, orders) => {

//         if (err) {
//             return callback(err);
//         }

//         if (orders.length === 0) {
//             return callback(null, null);
//         }

//         db.query(itemsSql, [id], (err, items) => {

//             if (err) {
//                 return callback(err);
//             }

//             const order = orders[0];

//             order.items = items;

//             callback(null, order);

//         });

//     });

// };


// // Create Order
// const createOrder = (order, callback) => {

//     const {
//         user_id,
//         customer_name,
//         customer_phone,
//         customer_address,
//         items
//     } = order;


//     const orderSql = `
//         INSERT INTO orders
//         (
//             user_id,
//             customer_name,
//             customer_phone,
//             customer_address,
//             total_amount
//         )
//         VALUES (?, ?, ?, ?, ?)
//     `;


//     let totalAmount = 0;

//     items.forEach(item => {

//         item.subtotal = item.quantity * item.price;

//         totalAmount += item.subtotal;

//     });


//     db.beginTransaction((transactionError) => {

//         if (transactionError) {
//             return callback(transactionError);
//         }


//         db.query(
//             orderSql,
//             [
//                 user_id,
//                 customer_name,
//                 customer_phone,
//                 customer_address,
//                 totalAmount
//             ],
//             (err, orderResult) => {

//                 if (err) {

//                     return db.rollback(() => {
//                         callback(err);
//                     });

//                 }


//                 const orderId = orderResult.insertId;


//                 const itemValues = items.map(item => [

//                     orderId,
//                     item.medicine_id,
//                     item.quantity,
//                     item.price,
//                     item.subtotal

//                 ]);


//                 const itemSql = `
//                     INSERT INTO order_items
//                     (
//                         order_id,
//                         medicine_id,
//                         quantity,
//                         price,
//                         subtotal
//                     )
//                     VALUES ?
//                 `;


//                 db.query(
//                     itemSql,
//                     [itemValues],
//                     (err) => {

//                         if (err) {

//                             return db.rollback(() => {
//                                 callback(err);
//                             });

//                         }


//                         db.commit((err) => {

//                             if (err) {

//                                 return db.rollback(() => {
//                                     callback(err);
//                                 });

//                             }


//                             callback(null, {
//                                 orderId,
//                                 totalAmount
//                             });

//                         });

//                     }
//                 );

//             }
//         );

//     });

// };


// // Update Order Status
// const updateOrderStatus = (id, status, callback) => {

//     const sql = `
//         UPDATE orders
//         SET order_status = ?
//         WHERE id = ?
//     `;

//     db.query(sql, [status, id], callback);
// };


// // Delete Order
// const deleteOrder = (id, callback) => {

//     const sql = `
//         DELETE FROM orders
//         WHERE id = ?
//     `;

//     db.query(sql, [id], callback);
// };


// module.exports = {
//     getAllOrders,
//     getOrderById,
//     createOrder,
//     updateOrderStatus,
//     deleteOrder
// };

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
        customer_name,
        medicine_name,
        quantity,
        total_price,
        status
    } = order;

    const sql = `
        INSERT INTO orders
        (
            customer_name,
            medicine_name,
            quantity,
            total_price,
            status
        )
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
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