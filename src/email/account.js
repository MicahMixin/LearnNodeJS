const sgMail = require("@sendgrid/mail");
require("dotenv").config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMail = () => {
  sgMail.send({
    to: "micahehrlich@gmail.com",
    from: "micahe@mixin.co.il",
    subject: "test email",
    text: "test text",
  });
};

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "micahe@mixin.co.il",
    subject: "Welcome to the new app",
    text: `Welcome to the app ${name}. If you don't like it then go screw yourself :)`,
  });
};

const sendCancellationEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "micahe@mixin.co.il",
    subject: "WHAT THE FUCK IS WRONG WITH YOU?",
    text: "Why did you cancel? what's your freaking problem",
  });
};

module.exports = { sendWelcomeEmail, sendMail, sendCancellationEmail };
