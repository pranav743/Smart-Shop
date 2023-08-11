const express = require("express");
const router = express.Router();
const User = require('../../models/user');
const transporter = require("../../addons/mailer")

const mailer = (email, code)=>{
    try {

        const num = code.toString().split('');

        const mailoptions = {
            from: process.env.MAIL,
            to: email,
            subject: "OTP",
            html: `
            <div style="width: 280px; margin: 0 auto; padding: 10px; background-color: #fff; border: 1px solid #ccc; border-radius: 4px; box-shadow: 0 0 5px #007bff; display: flex; align-items: center; justify-content: center; flex-direction: column;">
                <div style="display: flex; align-items: center; justify-content: center; width: 100%;">
                <h2 style="color: #007bff; padding: 0 2px;">${num[0]}</h2> 
                <h2 style="color: #007bff; padding: 0 2px;">${num[1]}</h2>
                <h2 style="color: #007bff; padding: 0 2px;">${num[2]}</h2>

                <h2 style="color: #007bff; padding: 0 2px;">${num[3]}</h2>
                <h2 style="color: #007bff; padding: 0 2px;">${num[4]}</h2>
                <h2 style="color: #007bff; padding: 0 2px;">${num[5]}</h2>   
                </div>
                <div style="width: 100%"><p style="margin-top: 15px; width: 250px; text-align: center">Valid for next 2 mins only </p></div>
              
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

router.put("/", async (req, res)=>{

    try {

        const randomInteger = Math.floor(100000 + Math.random() * 900000);

        const email = req.body.email;
        
        const filter = { email: req.body.email };
        const update = { $set: { validation: {code: randomInteger, validity: new Date(Date.now() + 120 * 1000)} } };

        const result = await User.updateMany(filter, update);
        mailer(req.body.email, randomInteger);
        res.status(200).json({success: true, msg: "OTP Generated"});
    } catch (error) {

        res.status(400).json({success: false, msg: error.message});
        
    }
    
    


    
});

module.exports= router;