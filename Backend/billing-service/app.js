const express = require("express");

const cors = require("cors");

const billingRoutes =
    require("./routes/billingRoutes");


const app = express();


app.use(cors());

app.use(express.json());


app.get("/", (req, res) => {

    res.send(
        "CMR Medical Agency - Billing Service Running..."
    );

});


app.use(
    "/api/billing",
    billingRoutes
);


module.exports = app;