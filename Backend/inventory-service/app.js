const express = require("express");

const cors = require("cors");

const inventoryRoutes = require("./routes/inventoryRoutes");


const app = express();


app.use(cors());

app.use(express.json());


app.get("/", (req, res) => {

    res.send("CMR Medical Agency - Inventory Service Running...");

});


app.use("/api/inventory", inventoryRoutes);


module.exports = app;