const express = require("express");

const cors = require("cors");

const userRoutes = require("./routes/userRoutes");


const app = express();


app.use(cors());

app.use(express.json());


// Home Route
app.get("/", (req, res) => {

    res.send("CMR Medical Agency - User Service Running...");

});


// User Routes
app.use("/api/users", userRoutes);


module.exports = app;