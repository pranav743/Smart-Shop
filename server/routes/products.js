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

// Endpoint for search suggestions
router.get("/suggestions", async (req, res) => {
  try {
    const { q } = req.query; // Get the search query from the URL query parameters

    if (!q) {
      // If no search query is provided, return an empty suggestion list
      return res.status(200).json({ success: true, suggestions: [] });
    }

    // Fetch product name suggestions from the database using aggregation pipeline
    const suggestions = await Product.aggregate([
      {
        $match: {
          title: { $regex: q, $options: "i" }, // Case-insensitive search for "title" field
        },
      },
      // {
      //   $project: {
      //     _id: 0,
      //     title: 1, // Include only the "title" field in the results
      //   },
      // },
    ]);

    // Custom sorting logic to prioritize suggestions with the query at the starting of the title
    const sortedSuggestions = suggestions.sort((a, b) => {
      const aTitleStartsWithQ = a.title.toLowerCase().startsWith(q.toLowerCase());
      const bTitleStartsWithQ = b.title.toLowerCase().startsWith(q.toLowerCase());

      if (aTitleStartsWithQ && !bTitleStartsWithQ) {
        return -1; // a comes before b
      } else if (!aTitleStartsWithQ && bTitleStartsWithQ) {
        return 1; // b comes before a
      } else {
        return 0; // no change in order
      }
    });

    // Limit the list to 5 unique suggestions (only "title" field)
    const uniqueSuggestions = sortedSuggestions
      .reduce((acc, product) => {
        if (!acc.includes(product.title)) {
          acc.push(product);
        }
        return acc;
      }, [])
      .slice(0, 7);

    return res.status(200).json({ success: true, suggestions: uniqueSuggestions });
  } catch (error) {
    console.log(`${error.message}`.red);
    return res.status(500).json({ success: false, msg: "Internal Server Error" });
  }
});

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
    const total = await Product.countDocuments(query);

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
   
});

router.get('/cartitems', async (req, res) => {
  try {
    const { _id } = req.query;

    // Split the comma-separated string into an array of _id values
    const idValues = _id.split(',');

    // Query the database with the array of _id values
    const products = await Product.find({ _id: { $in: idValues } });

    return res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, msg: 'Server error' });
  }
});

router.put("/update", async (req, res) => {
  try {
    const product_id = req.body._id;

    const product = await Product.findById(product_id);

    if (!product){
      return res.status(400).json({success: false, data: "No product Found"});
    }
    product.price.actual_price = req.body.actual_price;
    product.price.discount = req.body.discount;
    product.details.available_quantity = req.body.available_quantity;
    product.details.description = req.body.description;
    
    await product.save();

    return res.status(200).json({ success: true, data: "Updated Product" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, msg: 'Server error' });
  }
})

router.get('/analytics', async (req, res) => {
  try {
    // Use the aggregation pipeline to group and count documents by category
    const categoryCounts = await Product.aggregate([
      {
        $group: {
          _id: '$category.broad_category',
          count: { $sum: 1 },
        },
      },
    ]);

    // Format the result as an array of { category, count } objects
    const result = categoryCounts.map((item) => ({
      category: item._id,
      count: item.count,
    }));

    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, msg: 'Server error' });
  }
});


module.exports = router;