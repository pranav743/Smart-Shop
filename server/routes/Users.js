const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.get("/", async (req, res) => {
    try {
        const reqQuery = {...req.query};
        const removeFields = ['select', 'sort', 'limit', 'page'];
        removeFields.forEach(param => delete reqQuery[param]);
    
        let queryStr = JSON.stringify(reqQuery);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
        query = User.find(JSON.parse(queryStr));
        
    
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
        const total = await User.countDocuments(query);
    
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
    
        const users = await query;    
        if (!users){
            return res.status(401).json({success: false, msg: "No Users Found"});
        }   
        return res.status(200).json({success: true, count: users.length, pagination, data: users});    
      } catch (error) {
        console.log(`${error.message} (error)`.red);
        return res.status(400).json({success: false, msg: error.message});
      }
});

router.put("/toggle/:id", async (req, res) => {
    try {
      const userId = req.params.id;
  
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
  
      // Toggling the isActive status
      user.isActive = !user.isActive;

      await user.save();
  
      return res.status(200).json({ success: true, message: 'User isActive status toggled successfully', isActive: user.isActive });
    } catch (error) {
      console.error("Error toggling isActive status:", error);
      return res.status(500).json({ success: false, message: 'Error toggling isActive status', error: error.message });
    }
  });
  

module.exports = router;