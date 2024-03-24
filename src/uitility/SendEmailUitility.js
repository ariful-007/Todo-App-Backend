const nodemailer = require("nodemailer");

const SendEmailUitility = async (EmailTo, EmailText, EmailSubject) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "arifulislamwd007@gmail.com",
      pass: "oocg tbgm qkyu eise",
    },
  });
  const mailOptions = {
    from: '"Todo-Tasker"<arifulislamwd007@gmail.com>',
    to: EmailTo,
    subject: EmailText,
    text: EmailSubject,
  };
  return await transporter.sendMail(mailOptions);
}

module.exports = SendEmailUitility;