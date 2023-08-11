const express = require('express');
const router = express.Router();
const Product = require('../models/product'); 
const User = require("../models/user");

router.post('/add', async (req, res) => {
    try {
      const { rating, username, product_id, comment, user_id } = req.body;
  
      // Find the product by product_id
      const product = await Product.findById(product_id);
      if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }
  
      // Create a new review object
      const newReview = {
        rating: parseFloat(rating), // Convert the rating to a floating-point number
        comment,
        reviewer: username,
        date: new Date()
      };
  
      // Add the new review to the product's reviews array
      product.reviews.push(newReview);
  
      // Calculate the new average rating for the product
      const totalReviews = product.reviews.length;
      const sumOfRatings = product.reviews.reduce((sum, review) => sum + review.rating, 0);
      const newAvgRating = sumOfRatings / totalReviews;
  
      // Update the product's average rating
      product.details.avgRating = newAvgRating;
  
      // Save the updated product
      await product.save();
  
      // Find the user by user_id
      const user = await User.findById(user_id);
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
  
      // Update the isReviewed field in user's orders history
      user.orders.history.forEach(order => {
        if (order.product_id.toString() === product_id) {
          order.isReviewed = true;
        }
      });
  
      // Save the updated user
      await user.save();
  
      return res.status(200).json({ success: true, message: 'Review added successfully' });
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ success: false, message: 'Failed to add review', error: error.message });
    }
  });
  

module.exports = router;
