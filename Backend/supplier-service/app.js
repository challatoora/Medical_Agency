const express = require("express");
const cors = require("cors");

const supplierRoutes = require("./routes/supplierRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Supplier Service Running...");
});

app.use("/api/suppliers", supplierRoutes);

module.exports = app;