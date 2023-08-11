const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require('../models/user');



router.post("/", async (req, res) => {

    try {

        const token = req.headers.authorization.split(" ")[1];
        var decoded = await jwt.verify(token, process.env.JWT_SECRET);
    
        const user = await User.findOne({_id: decoded._id});
        if (user) {
            console.log(`${user.email} just logged in`.bold);
            return res.status(200).json({success: true, msg: user});
        } else{
            return res.status(400).json({success: false, msg: "User cannot be Autheticated"});
        }


        
    } catch (error) {
        console.log("Invalid Token".red.bold);
        return res.status(401).json({success: false, msg: `User cannot be Autheticated`, problem: error.message});
    }
   
})

module.exports = router;