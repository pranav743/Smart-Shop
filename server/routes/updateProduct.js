const express = require("express");
const router = express.Router();


router.post("/", async (req, res)=>{
    res.status(200).json({success: true, msg: "Update Product"});
});

module.exports = router;
