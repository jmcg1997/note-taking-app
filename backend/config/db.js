const mongoose = require("mongoose");

// ✅ Function to establish connection with MongoDB
const connectDB = async () => {
    try {
        // Attempt to connect using the connection string stored in .env (MONGO_URI)
        await mongoose.connect(process.env.MONGO_URI, {
            // These options were often required in older versions of Mongoose, 
            // but are now usually handled automatically (can be removed in newer versions).
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        });

        // ✅ Successful connection
        console.log("✅ MongoDB Connected");
    } catch (error) {
        // ❌ Log error and force application to exit if connection fails
        console.error("❌ MongoDB Connection Error:", error);
        process.exit(1); // Exit process with failure
    }
};

// ✅ Export the connection function to be used in server.js
module.exports = connectDB;
