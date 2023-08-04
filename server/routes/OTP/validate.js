const express = require("express");
const router = express.Router();
const User = require('../../models/user');
const transporter = require("../../addons/mailer");


const mailer = (email, name)=>{
    try {

        const mailoptions = {
            from: process.env.MAIL,
            to: email,
            subject: "Thank You for Joining us",
            html: `
            <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #fff; border: 1px solid #ccc; border-radius: 4px; box-shadow: 0 0 5px #007bff;">
            <h1 style="color: #007bff;">Welcome Aboard !</h1>
            <p style="margin-bottom: 20px;">
              Dear ${name},
              <br>
        
              <p>We are thrilled to have you as a new member of our community. Thank you for joining us and choosing to be a part of our platform. </p>
            </p>
            <p style="margin-bottom: 20px;">
              If you have any questions or need assistance, feel free to contact us. We're here to help!
            
            </p>
            <p style="text-align: end;">
              Best regards, 
              <br>
              The whole Team
            </p>
          </div>`
        }
        transporter.sendMail(mailoptions, (error, res)=>{
            if (error){
                console.log(error);
            } else{
                console.log(`Confirmation Email sent to ${email}`);
            }
        });
        
    } catch (error) {
        console.log(`Mailing Error: ${error.message}`);
    }
}

router.post("/", async (req, res)=> {

    

    try {

        const user = await User.findOne({ email: req.body.email});

        const otp = user.validation.code;
        const expiry = user.validation.validity;
        const currentDate = new Date(Date.now());

        if (user && !user.active){
            if (currentDate < expiry && otp == req.body.otp){
                
                const update = { $set: { isActive: true, validation: {code: null, validity: null}} } ;

                const result = await User.findByIdAndUpdate(user._id, update);

                // Sending Mail
                mailer(req.body.email, req.body.name);

                return res.status(200).json({success: true, msg:"OTP validated"});
            }
            else{
                return res.status(401).json({success: false, msg:"Wrong OTP"});
            }     
        }

        res.status(400).json({success: false, msg:"User Already Validated"});
        
    } catch (error) {

        res.status(400).json({success: false, msg:"Wrong OTP"});
        
    }

});

module.exports = router;