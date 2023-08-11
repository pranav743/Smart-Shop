
const nodemailer = require("nodemailer");
require('dotenv').config({path: '../config.env'});


const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL,
    pass: process.env.PASS
  }
});




const mailoptions = {
    from: process.env.MAIL,
    to: "masterpranav07@gmail.com",
    subject: "Thank You for Joining us",
    html: `
    <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #fff; border: 1px solid #ccc; border-radius: 4px; box-shadow: 0 0 5px #007bff;">
    <h1 style="color: #007bff;">Welcome Aboard !</h1>
    <p style="margin-bottom: 20px;">
      Dear User,
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

// transporter.sendMail(mailoptions, (error, res)=>{
//     if (error){
//         console.log(error);
//     } else{
//         console.log("Email sent : "+ res.response);
//     }
// })

module.exports = transporter;