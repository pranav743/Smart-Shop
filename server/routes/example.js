const express = require('express');
const router = express.Router();

// const { User } = require('../models/user'); (For Example only)



router.post("/", async (req, res) => {
    
    return res.status(200).json({success: true, msg: `This is the 'example' route`});

})

module.exports = router;