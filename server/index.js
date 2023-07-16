const express = require("express");
const dotenv = require("dotenv").config({ path: './config.env'});
const app = express();
const colors = require("colors");
const connectDB = require("./database/db");
const cors = require('cors');

// Importing Routes    Example : const userRoutes = require('./routes/users');

// User
const users = require("./routes/Users");



//Admin
const listProduct = require("./routes/listProduct");
const products = require("./routes/products");
const updateProduct = require("./routes/updateProduct");






// MiddleWare
app.use(express.json());
app.use(cors());



// Routes      Example : app.use("/api/users", userRoutes);
app.use("/api/admin/listproduct", listProduct);
app.use("/api/admin/products", products);
app.use("/api/admin/updateproduct", updateProduct);






// Connecting to MongoDB
connectDB();





PORT = process.env.PORT || 5000;
app.listen(PORT, (req, res) => {
    console.log(`Server running on Port ${PORT}`.yellow.bold);
})



