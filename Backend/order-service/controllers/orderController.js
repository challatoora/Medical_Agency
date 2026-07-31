// const orderModel = require("../models/orderModel");


// // Get All Orders
// const getAllOrders = (req, res) => {

//     orderModel.getAllOrders((err, results) => {

//         if (err) {

//             console.error(err);

//             return res.status(500).json({
//                 message: "Failed to fetch orders"
//             });

//         }

//         res.status(200).json(results);

//     });

// };


// // Get Order By ID
// const getOrderById = (req, res) => {

//     const { id } = req.params;


//     orderModel.getOrderById(id, (err, order) => {

//         if (err) {

//             console.error(err);

//             return res.status(500).json({
//                 message: "Failed to fetch order"
//             });

//         }


//         if (!order) {

//             return res.status(404).json({
//                 message: "Order not found"
//             });

//         }


//         res.status(200).json(order);

//     });

// };


// // Create Order
// const createOrder = (req, res) => {

//     const {
//         user_id,
//         customer_name,
//         customer_phone,
//         customer_address,
//         items
//     } = req.body;


//     if (
//         !user_id ||
//         !customer_name ||
//         !customer_phone ||
//         !customer_address ||
//         !items ||
//         items.length === 0
//     ) {

//         return res.status(400).json({
//             message: "User, customer details and order items are required"
//         });

//     }


//     orderModel.createOrder(
//         req.body,
//         (err, result) => {

//             if (err) {

//                 console.error(err);

//                 return res.status(500).json({
//                     message: "Failed to create order"
//                 });

//             }


//             res.status(201).json({

//                 message: "Order created successfully",

//                 orderId: result.orderId,

//                 totalAmount: result.totalAmount

//             });

//         }
//     );

// };


// // Update Order Status
// const updateOrderStatus = (req, res) => {

//     const { id } = req.params;

//     const { order_status } = req.body;


//     if (!order_status) {

//         return res.status(400).json({
//             message: "Order status is required"
//         });

//     }


//     orderModel.updateOrderStatus(
//         id,
//         order_status,
//         (err, result) => {

//             if (err) {

//                 console.error(err);

//                 return res.status(500).json({
//                     message: "Failed to update order status"
//                 });

//             }


//             if (result.affectedRows === 0) {

//                 return res.status(404).json({
//                     message: "Order not found"
//                 });

//             }


//             res.status(200).json({

//                 message: "Order status updated successfully"

//             });

//         }
//     );

// };


// // Delete Order
// const deleteOrder = (req, res) => {

//     const { id } = req.params;


//     orderModel.deleteOrder(id, (err, result) => {

//         if (err) {

//             console.error(err);

//             return res.status(500).json({
//                 message: "Failed to delete order"
//             });

//         }


//         if (result.affectedRows === 0) {

//             return res.status(404).json({
//                 message: "Order not found"
//             });

//         }


//         res.status(200).json({

//             message: "Order deleted successfully"

//         });

//     });

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