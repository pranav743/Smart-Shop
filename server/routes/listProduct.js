const express = require("express");
const router = express.Router()
const Product = require("../models/product");

function convertToSlug(str) {
  // Replace spaces with hyphens
  const slug = str.replace(/\s+/g, '-');

  // Convert to lowercase
  const lowercaseSlug = slug.toLowerCase();

  return lowercaseSlug;
}
  

router.post("/", async (req, res) => {

  try {


    
    const product = {
      ...req.body
    };
    const isProduct = await Product.findOne({title: product.title});

    if (isProduct){
        return res.status(401).json({success: false, msg: "Product already Exists"});
    }
    
    await new Product({...product, slug: convertToSlug(product.title)}).save();
    console.log(`Product '${req.body.title}' Listed Successfully`.blue.bold);
    return res.status(200).json({success: true, msg: "Product Listed Successfully"});
    
  } catch (error) {
    console.log(`${error.message} (error)`.red);
    return res.status(400).json({success: false, msg: error.message});
  }
   
})

module.exports = router;