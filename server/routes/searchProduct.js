const express = require("express")
const router = express.Router()


router.get("/", async (req, res) => {
    try {
        return res.status(200).json({success: true, msg: 'This is Search Route'});
    } catch (error) {
        console.log(`${error.message}`.red);
        return res.status(400).json({success: true, msg: error.msg});
    }
    
})


module.exports = router;