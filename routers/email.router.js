// import { loginMiddleware } from "../middlewares/login.middleware.js";
// import * as Controllers from "../controllers/clients.control.js";
// import { usersImgParser } from "../settings/cloudinary.js";
// import * as Controllers from "../controllers/email.control.js";
const express = require("express");
const nodemailer = require("nodemailer"); // needed for server email

const { SMTP_EMAIL, TO_EMAIL, SMTP_HOST, SMTP_PASS } = process.env;

const emailRouter = express.Router();
emailRouter.get("/", (req, res) => {
  res.status(200);
  res.send("App is running..");
});
emailRouter.get("/test", (req, res) => {
  res.status(200);
  res.send(`read this : ${process.env.PORT} is it vissble?`);
});

emailRouter.post("/send-email", async (req, res) => {
  const { to, subject, bill, email, name, message, phone } = req.body;

  let transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: 587,
    secure: false,
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASS,
    },
  });

  try {
    // Send an email to your business email address
    await transporter.sendMail({
      from: SMTP_EMAIL,
      to: TO_EMAIL,
      subject: `WEB INQUIRY:  " + ${subject} - ${email}`,
      text: `This is an automated message \n
      This form was completed online in Contact us. Below are client details and message \n Reply To Client in New EMail\n
       CLIENT DETAILS:\n
       Name : ${name} 
       Phone : ${phone} 
       Bill : ${bill}
       Email : ${email} \n
       Subject: ${subject} 
       Message: ${message} \n
     
      `,
    });

    // Send a copy to the user's email address
    await transporter.sendMail({
      from: SMTP_EMAIL,
      to: email,
      subject: "AMR SOLAR: Copy Of Message Sent Online",
      text: `\nThank you for contacting us.
      Please note that you can't reply to this email as it is auto generated.

      Here is a copy of your details and message you submitted.

       Name : ${name}
       Phone : ${phone}
       Bill : ${bill}
       Email : ${email}\n
       Subject: ${subject}
       Message: ${message} \n

       Please note we will read and reply as soon as possible, should it be urgent, please don't hessitate to contact us on 4365476457 \n
       Kind Regards, AMR Solar Team
       info@amr-solar.co.za`,
    });

    res.status(200).json({ message: "Form submitted successfully" });
  } catch (error) {
    console.error("Error sending emails:", error);
    res.status(500).json({ error: "An error occurred while processing your request" });
  }
});

module.exports = emailRouter;
