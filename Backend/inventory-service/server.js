const app = require("./app");

const PORT = 5003;

app.listen(PORT, () => {
    console.log(`Inventory Service Running on Port ${PORT}`);
});