const nodemailer = require("nodemailer");
const asyncHandler = require("express-async-handler");

const sendEmail = asyncHandler(async(data,req,res)=>{
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, 
    auth: {
      user: process.env.MAIL_ID, 
      pass: process.env.MP, 
    },
  });

  let info = await transporter.sendMail({
    from: 'ecommorce-digitc@gmail.com',
    to: data.to,
    subject: data.subject,
    text: data.text,
    html: data.htm,
  }, function(error, res){
    if(error){
      console.log("Error", error);
    }else {
      console.log('Email sent: ' + res.response);
    }
  });


  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
})


module.exports = {sendEmail};