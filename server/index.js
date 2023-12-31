const express = require("express");
const dotenv = require("dotenv").config({ path: './config.env'});
const app = express();
const colors = require("colors");
const connectDB = require("./database/db");
const cors = require('cors');
const path = require('path');


// Importing Routes    Example : const userRoutes = require('./routes/users');

// User
const users = require("./routes/Users");
const registerUser = require("./routes/registerUser");
const generateotp = require("./routes/OTP/generate");
const validateotp = require("./routes/OTP/validate");
const userauth = require("./routes/auth");
const afterauth = require("./routes/afterauth");
const cart = require("./routes/cart");
const review = require("./routes/reviews");



//Admin
const listProduct = require("./routes/listProduct");
const products = require("./routes/products");
const updateProduct = require("./routes/updateProduct");
const searchProduct = require("./routes/searchProduct");






// MiddleWare
app.use(express.json());
app.use(cors());
app.use('/images', express.static(path.join(__dirname, 'imgs')));



// Routes      Example : app.use("/api/users", userRoutes);
app.use("/api/admin/listproduct", listProduct);
app.use("/api/admin/products", products);
app.use("/api/admin/updateproduct", updateProduct);
app.use("/api/admin/searchproduct", searchProduct);
app.use("/api/admin/users", users);

app.use("/api/client/registeruser", registerUser);
app.use("/api/client/generateotp", generateotp);
app.use("/api/client/validateotp", validateotp);
app.use("/api/client/userauth", userauth);
app.use("/api/client/afterauth", afterauth);
app.use("/api/client/cart", cart);
app.use("/api/client/review", review);







// Connecting to MongoDB
connectDB();





PORT = process.env.PORT || 5000;
app.listen(PORT, (req, res) => {
    console.log(`Server running on Port ${PORT}`.yellow.bold);
})



