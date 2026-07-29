const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const medicineRoutes = require("./routes/medicineRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/medicines", medicineRoutes);

module.exports = app;