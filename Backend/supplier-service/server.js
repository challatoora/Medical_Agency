// const app = require("./app");

// const PORT = 5002;

// app.listen(PORT, () => {
//     console.log(`Supplier Service Running on Port ${PORT}`);
// });

const app = require("./app");
const connectDB = require("./config/db");

const PORT = 5002;

const startServer = async () => {
    await connectDB();

    app.listen(PORT, "0.0.0.0", () => {
        console.log(
            `Supplier Service Running on Port ${PORT}`
        );
    });
};

startServer();