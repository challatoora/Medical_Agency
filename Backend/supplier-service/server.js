const app = require("./app");

const PORT = 5002;

app.listen(PORT, () => {
    console.log(`Supplier Service Running on Port ${PORT}`);
});