const express = require("express");
const router = express.Router()
const Product = require("../models/product");

const dummyProduct = {
    title: "Dummy Product | Test Product | Just for Testing purpose",
    slug: "dummy-product",
    price: {
      actual_price: 99.99,
      discount: 10,
    },
    category: {
      broad_category: "Electronics",
      sub_category: "Mobile Phones",
    },
    details: {
      brand: "Dummy Brand",
      available_quantity: 50,
      country_of_origin: "United States",
      material: "Plastic",
      isReturnable: true,
      imgs: ["image1.jpg", "image2.jpg"],
      description: "This is a dummy product description.",
    },
  };
  

router.post("/", async (req, res) => {

  try {
    const product = {
      ...req.body
    }
    // console.log(product);
    await new Product(product).save();
    console.log(`Product '${req.body.title}' Listed Successfully`.blue.bold);
    return res.status(200).json({success: true, msg: "Product Listed Successfully"});
    
  } catch (error) {
    console.log(`${error.message} (error)`.red);
    return res.status(400).json({success: false, msg: error.message});
  }
   
})

module.exports = router;