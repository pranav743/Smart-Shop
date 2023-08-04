const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require("bcrypt");




router.post("/", async (req, res) => {

    try {
        

        const user = await User.findOne({ email: req.body.email});
        if (user && user.active){
            console.log(`User ${req.body.email} already Exists `);
            return res.status(400).json({success: false, msg: `User ${req.body.email} already Exists`}); 
        } else if(user && !user.active){
            const salt = await bcrypt.genSalt(Number(process.env.SALT));
            const hashPassword = await bcrypt.hash(req.body.password, salt);
            await User.findByIdAndUpdate(user._id,{...req.body, password: hashPassword, active: false, validation: {code: null, validity: null}});
            return res.status(201).json({ success: true, msg: `User ${req.body.email} Created Successfully`.blue.bold});
        }

        
        // Hashing Password
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        // Creating User
        await new User({...req.body, password: hashPassword, active: false}).save();
        console.log(`User ${req.body.email} Created Successfully`.blue.bold);


        
    

        // Returning success response
        return res.status(201).json({ success: true, msg: 'User Created Successfully'});

    } catch (error) {
        console.log(`Error: ${error.message}`.red);
        res.status(400).json({success: false, msg: error.message});       
    }    
})


module.exports = router;