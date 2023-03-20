const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your_email@gmail.com',
    pass: 'your_email_password'
  }
});

const mailOptions = {
  from: 'your_email@gmail.com',
  to: 'recipient_email@example.com',
  subject: 'Test email from InviteGo app',
  text: 'Hello, this is a test email from the InviteGo app.'
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
