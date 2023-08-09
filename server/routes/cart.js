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


router.post('/move-all-to-current', async (req, res) => {
  try {
    const { user_id, payment_method, address } = req.body;


    // Find the user by user_id
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    const currentDate = new Date();

    // Prepare items to add to orders.current
    const itemsToAdd = user.orders.cart.map(({ product_id, quantity }) => ({
      address: address,
      product_id: product_id.toString(),
      quantity,
      payment_method,
      placedAt: currentDate
    }));

    // Move all orders from cart to current orders with payment_method
    user.orders.current.push(...itemsToAdd);
    user.orders.cart = [];

    // Save the updated user
    await user.save();

    return res.status(200).json({ success: true, message: 'All items moved to current orders with payment_method' });
  } catch (error) {
    console.log("Failed to move items to current orders with payment_method".red.bold);
    return res.status(500).json({ success: false, msg: 'Failed to move items to current orders with payment_method', problem: error.message });
  }
});

router.post('/move-to-history', async (req, res) => {
  try {
    const { user_id, product_id, amount } = req.body;

    // Find the user by user_id
    const user = await User.findById(user_id);
    console.log(user.email, product_id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Find the specific product in orders.current
    const productIndex = user.orders.current.findIndex((item) => item.product_id.toString() === product_id);

    if (productIndex === -1) {
      return res.status(404).json({ success: false, message: 'Product not found in orders.current' });
    }

    // Move the specific product to orders.history
    const specificProduct = user.orders.current[productIndex];
    const data = {
      product_id: user.orders.current[productIndex].product_id,
      quantity: user.orders.current[productIndex].quantity,
      payment_method: user.orders.current[productIndex].payment_method,
      address: user.orders.current[productIndex].address,
      amount: amount,
      completedAt: new Date()
    }

    user.orders.history.push(data);
    user.orders.current.splice(productIndex, 1);

    // Save the updated user
    await user.save();

    return res.status(200).json({ success: true, message: 'Product moved to orders.history' });
  } catch (error) {
    console.log(error.message.red.bold);
    return res.status(500).json({ success: false, msg: 'Failed to move the product to orders.history', problem: error.message });
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

// Route to get all products in orders.current from all users
router.get('/current-orders', async (req, res) => {
  try {
    // Find all users with orders.current and populate the user field
    const users = await User.find(
      { 'orders.current': { $exists: true, $not: { $size: 0 } } },
      { 'orders.current': 1 }
    ).populate('orders.current.product_id', 'name');

    // Extract the products from orders.current arrays of all users and add user_id
    const allProducts = users.reduce((products, user) => {
      const userProducts = user.orders.current.map((product) => ({
        user_id: user._id,
        product_name: product.product_id.name,
        ...product.toObject(),
      }));
      return [...products, ...userProducts];
    }, []);

    return res.status(200).json({ success: true, data: allProducts });
  } catch (error) {
    console.log("Failed to get products in orders.current from all users".red.bold);
    return res.status(500).json({ success: false, msg: 'Failed to get products in orders.current', problem: error.message });
  }
});




module.exports = router;


