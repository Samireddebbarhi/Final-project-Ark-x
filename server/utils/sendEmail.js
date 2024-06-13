const nodemailer = require("nodemailer");
//const { google } = require("googleapis");
require("dotenv").config();

const sendEmail = async (options) => {
  try {
    console.log("SMTP Port:", process.env.SMTP_PORT);
    console.log("User Mail:", process.env.USER_MAIL);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      PORT: process.env.SMTP_PORT || 587,
      secure: false,
      auth: {
        user: process.env.USER_MAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.USER_MAIL,
      to: options.email,
      subject: options.subject,
      text: options.message,
      html: options.html,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log("Email sent:", result);
    return result;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

module.exports = sendEmail;
