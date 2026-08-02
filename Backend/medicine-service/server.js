const app = require("./app");
const connectDB = require("./config/db");

const PORT = 5001;

const startServer = async () => {
    await connectDB();

    app.listen(PORT, "0.0.0.0", () => {
        console.log(
            `Medicine Service Running on Port ${PORT}`
        );
    });
};

startServer();