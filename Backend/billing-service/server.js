const app = require("./app");

const PORT = 5005;


app.listen(PORT, () => {

    console.log(
        `Billing Service Running on Port ${PORT}`
    );

});