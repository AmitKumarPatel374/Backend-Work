const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service:"gmail",
  auth:{
    user:process.env.EMAIL,
    pass:process.env.EMAIL_PASS
  }
})

const sendMail = async(to,subject,html)=>{
   let msg={
    to,
    subject,
    html
   }

   return await transporter.sendMail(msg);
}

module.exports = sendMail;