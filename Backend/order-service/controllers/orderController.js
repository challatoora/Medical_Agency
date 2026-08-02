const orderModel = require("../models/orderModel");

// ==============================
// GET ALL ORDERS
// ==============================

const getAllOrders = (req, res) => {


orderModel.getAllOrders((err, results) => {

    if (err) {
        console.error("Get all orders error:", err);

        return res.status(500).json({
            message: "Failed to fetch orders"
        });
    }

    res.status(200).json(results);

});


};

// ==============================
// GET ORDERS BY USER ID
// ==============================

const getOrdersByUserId = (req, res) => {


const userId = req.query.userId;

console.log("Fetching orders for user ID:", userId);

if (!userId) {

    return res.status(400).json({
        message: "userId is required"
    });

}

orderModel.getOrdersByUserId(
    userId,
    (err, results) => {

        if (err) {

            console.error(
                "Get user orders error:",
                err
            );

            return res.status(500).json({
                message: "Failed to fetch user orders",
                error: err.message
            });

        }

        res.status(200).json(results);

    }
);


};

// ==============================
// GET ORDER BY ID
// ==============================

const getOrderById = (req, res) => {


orderModel.getOrderById(
    req.params.id,
    (err, order) => {

        if (err) {

            console.error(
                "Get order by ID error:",
                err
            );

            return res.status(500).json({
                message: "Failed to fetch order"
            });

        }

        if (!order) {

            return res.status(404).json({
                message: "Order not found"
            });

        }

        res.status(200).json(order);

    }
);


};

// ==============================
// CREATE ORDER
// ==============================

const createOrder = (req, res) => {


console.log(
    "Creating order:",
    req.body
);

orderModel.createOrder(
    req.body,
    (err, result) => {

        if (err) {

            console.error(
                "Create order error:",
                err
            );

            return res.status(500).json({
                message: "Failed to create order",
                error: err.message
            });

        }

        res.status(201).json({
            message: "Order created successfully",
            orderId: result.insertId
        });

    }
);


};

// ==============================
// UPDATE ORDER
// ==============================

const updateOrder = (req, res) => {


orderModel.updateOrder(
    req.params.id,
    req.body,
    (err, result) => {

        if (err) {

            console.error(
                "Update order error:",
                err
            );

            return res.status(500).json({
                message: "Failed to update order"
            });

        }

        if (result.affectedRows === 0) {

            return res.status(404).json({
                message: "Order not found"
            });

        }

        res.status(200).json({
            message: "Order updated successfully"
        });

    }
);


};

// ==============================
// DELETE ORDER
// ==============================

const deleteOrder = (req, res) => {


orderModel.deleteOrder(
    req.params.id,
    (err, result) => {

        if (err) {

            console.error(
                "Delete order error:",
                err
            );

            return res.status(500).json({
                message: "Failed to delete order"
            });

        }

        if (result.affectedRows === 0) {

            return res.status(404).json({
                message: "Order not found"
            });

        }

        res.status(200).json({
            message: "Order deleted successfully"
        });

    }
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
