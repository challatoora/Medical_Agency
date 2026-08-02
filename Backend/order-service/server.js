const express = require("express");
const cors = require("cors");

const orderRoutes = require("./routes/orderRoutes");

const app = express();

const PORT = 5004;

app.use(cors());
app.use(express.json());

app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => {
    res.send("Order Service Running");
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Order Service running on port ${PORT}`);
});