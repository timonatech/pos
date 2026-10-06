const mongoose = require("mongoose");

const connectDB = async () => {
    const URI = process.env.MONGO_URI;

    if (!URI) {
        console.error("MongoDB URI is not defined");
        process.exit(1);
    }

    try {
        const conn = await mongoose.connect(URI);

        console.log("Database connected successfully");
        console.log(`Database: ${conn.connection.name}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;