const express = require("express");

const cors = require("cors");

const orderRoutes = require("./routes/orderRoutes");


const app = express();


app.use(cors());

app.use(express.json());


app.get("/", (req, res) => {

    res.send("CMR Medical Agency - Order Service Running...");

});


app.use("/api/orders", orderRoutes);


module.exports = app;