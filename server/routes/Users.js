const express = require("express");
const router = express.Router()

router.get("/", async (req, res) => {
    res.status(200).json({success: true, msg: "Get All users"});
})

module.exports = router;