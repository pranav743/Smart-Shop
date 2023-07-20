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

  

router.get("/", async (req, res) => {

  try {
    const reqQuery = {...req.query};
    const removeFields = ['select', 'sort', 'limit', 'page'];
    removeFields.forEach(param => delete reqQuery[param]);

    let queryStr = JSON.stringify(reqQuery);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
    query = Product.find(JSON.parse(queryStr));
    

    //Selection
    if (req.query.select){
      const fields = req.query.select.split(',').join(' ');
      query = query.select(fields);
    }
    
    // Sorting
    if (req.query.sort){
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else{
      query = query.sort('-postedAt');
    }

    //Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 6;
    const startIndex = (page -1)*limit;
    const endIndex = page*limit;
    const total = await Product.countDocuments();

    query = query.skip(startIndex).limit(limit);
    const pagination = {};
    if (endIndex < total){
      pagination.next = {
        page: page + 1,
        limit
      }
    }
    if (startIndex > 0){
      pagination.prev = {
        page: page - 1,
        limit
      }
    }

    const products = await query;    
    if (!products){
        return res.status(401).json({success: false, msg: "No Products Listed"});
    }   
    return res.status(200).json({success: true, count: products.length, pagination, data: products});    
  } catch (error) {
    console.log(`${error.message} (error)`.red);
    return res.status(400).json({success: false, msg: error.message});
  }
   
})

module.exports = router;