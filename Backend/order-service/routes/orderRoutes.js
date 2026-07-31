// const express = require("express");

// const router = express.Router();

// const orderController = require("../controllers/orderController");


// // Get All Orders
// router.get("/", orderController.getAllOrders);


// // Get Order By ID
// router.get("/:id", orderController.getOrderById);


// // Create Order
// router.post("/", orderController.createOrder);


// // Update Order Status
// router.put("/:id/status", orderController.updateOrderStatus);


// // Delete Order
// router.delete("/:id", orderController.deleteOrder);


// module.exports = router;

const express = require("express");

const router = express.Router();

const orderController = require("../controllers/orderController");

// GET ALL ORDERS
router.get("/", orderController.getAllOrders);

// GET ORDER BY ID
router.get("/:id", orderController.getOrderById);

// CREATE ORDER
router.post("/", orderController.createOrder);

// UPDATE ORDER
router.put("/:id", orderController.updateOrder);

// DELETE ORDER
router.delete("/:id", orderController.deleteOrder);

module.exports = router;