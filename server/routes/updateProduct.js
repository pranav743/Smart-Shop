const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Route to update quantity of a product in the user's cart
router.put('/update-cart-quantity', async (req, res) => {
  try {
    const { user_id, product_id, quantity } = req.body;

    // Find the user by user_id
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Find the product in the user's cart by product_id
    const cartItem = user.orders.cart.find(item => item.product_id === product_id);
    if (!cartItem) {
      return res.status(404).json({ success: false, message: 'Product not found in user cart' });
    }
    cartItem.quantity = quantity;
    await user.save();

    return res.status(200).json({ success: true, message: 'Cart quantity updated' });
  } catch (error) {
    console.log("Failed to update cart quantity".red.bold);
    return res.status(500).json({ success: false, msg: 'Failed to update cart quantity', problem: error.message });
  }
});

module.exports = router;
