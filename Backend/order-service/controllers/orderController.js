const orderModel = require("../models/orderModel");

// GET ALL ORDERS
const getAllOrders = (req, res) => {

    orderModel.getAllOrders((err, results) => {

        if (err) {
            console.error(err);

            return res.status(500).json({
                message: "Failed to fetch orders"
            });
        }

        res.status(200).json(results);

    });

};

// GET ORDER BY ID
const getOrderById = (req, res) => {

    orderModel.getOrderById(req.params.id, (err, order) => {

        if (err) {
            console.error(err);

            return res.status(500).json({
                message: "Failed to fetch order"
            });
        }

        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        res.json(order);

    });

};

// CREATE ORDER
const createOrder = (req, res) => {

    orderModel.createOrder(req.body, (err, result) => {

        if (err) {
            console.error(err);

            return res.status(500).json({
                message: "Failed to create order"
            });
        }

        res.status(201).json({
            message: "Order created successfully",
            orderId: result.insertId
        });

    });

};

// UPDATE ORDER
const updateOrder = (req, res) => {

    orderModel.updateOrder(req.params.id, req.body, (err, result) => {

        if (err) {
            console.error(err);

            return res.status(500).json({
                message: "Failed to update order"
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        res.json({
            message: "Order updated successfully"
        });

    });

};

// DELETE ORDER
const deleteOrder = (req, res) => {

    orderModel.deleteOrder(req.params.id, (err, result) => {

        if (err) {
            console.error(err);

            return res.status(500).json({
                message: "Failed to delete order"
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        res.json({
            message: "Order deleted successfully"
        });

    });

};

module.exports = {
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder
};