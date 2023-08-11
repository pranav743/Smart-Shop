const router = require("express").Router();
const Joi = require("joi");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');



router.post("/", async (req, res) => {

    try {


        
        const user = await User.findOne({email : req.body.email});
        if(!user){
            return res.status(400).json({success: false, msg: "Invalid Email or Password"});
        } else if (!user.isActive){
            return res.status(400).json({success: false, msg: "Invalid Email or Password"});
        };

        const validPassword = await bcrypt.compare(
            req.body.password, user.password
        ) 

        if(!validPassword){
            return res.status(401).json({success: false, msg: "Invalid Email or Password"});
        }
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: "7d"});
        // const token = user.generateAuthToken();
        res.status(200).json({ success: true, token: token, msg: "User Authenticated"});
        
    } catch (error) {

        console.log(`Error: ${error.message}`.red);
        res.status(400).json({ success: false, msg: `auth.js | ${error.message}`});
        
    }
    
})



module.exports = router;