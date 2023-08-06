const express = require("express");
const router = express.Router();
const User = require("../models/user");



router.post("/add", async (req, res) => {

    try {
        const user = await User.findById(req.body._id);
        if (!user) {
          return res.status(404).json({ success: false, message: 'User not found' });
        }
    
        const existingCartItem = user.orders.cart.find(item => item.product_id === req.body.product_id);
    
        if (existingCartItem) {
          existingCartItem.quantity += 1;
        } else {
          user.orders.cart.push({
            product_id: req.body.product_id,
            quantity: 1
          });
        }
    
        await user.save();
        return res.status(200).json({ success: true, message: 'Item added to the Cart' });
      } catch (error) {
        console.log("Item cannot be added".red.bold);
        return res.status(500).json({ success: false, msg: `Item Cannot be Added`, problem: error.message });
      }

});

router.post("/delete", async (req, res) => {
  try {
    const user = await User.findById(req.body._id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const productToDelete = req.body.product_id;
    const cartItemIndex = user.orders.cart.findIndex(item => item.product_id === productToDelete);

    if (cartItemIndex !== -1) {
      user.orders.cart.splice(cartItemIndex, 1); // Remove the item from the cart array
      await user.save();
      return res.status(200).json({ success: true, message: 'Item removed from the Cart' });
    } else {
      return res.status(404).json({ success: false, message: 'Item not found in the Cart' });
    }
  } catch (error) {
    console.log("Item cannot be deleted".red.bold);
    return res.status(500).json({ success: false, msg: `Item Cannot be Deleted`, problem: error.message });
  }
});


module.exports = router;