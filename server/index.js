const express = require("express");
const dotenv = require("dotenv").config({ path: './config.env'});
const app = express();
const colors = require("colors");
const connectDB = require('./db');
const cors = require('cors');

// Importing Routes    Example : const userRoutes = require('./routes/users');







// MiddleWare
app.use(express.json());
app.use(cors());



// Routes      Example : app.use("/api/users", userRoutes);







// Connecting to MongoDB
connectDB();





PORT = process.env.PORT || 5000;
app.listen(PORT, (req, res) => {
    console.log(`Server running on Port ${PORT}`.yellow.bold);
})



