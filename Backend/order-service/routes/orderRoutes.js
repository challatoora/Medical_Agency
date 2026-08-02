const express = require("express");

const router = express.Router();

const orderController = require("../controllers/orderController");

// GET ORDERS
router.get("/", (req, res) => {

    console.log("GET /api/orders called");
    console.log("Query:", req.query);

    if (req.query.userId) {

        console.log(
            "Fetching orders for user:",
            req.query.userId
        );

        return orderController.getOrdersByUserId(
            req,
            res
        );
    }

    console.log("Fetching all orders");

    return orderController.getAllOrders(
        req,
        res
    );

});


// GET ORDER BY ID
router.get(
    "/:id",
    orderController.getOrderById
);


// CREATE ORDER
router.post(
    "/",
    orderController.createOrder
);


// UPDATE ORDER
router.put(
    "/:id",
    orderController.updateOrder
);


// DELETE ORDER
router.delete(
    "/:id",
    orderController.deleteOrder
);


module.exports = router;