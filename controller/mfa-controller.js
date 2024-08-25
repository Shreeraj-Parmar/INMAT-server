import nodemailer from "nodemailer";
import User from "../model/user.js"; //.js lagado
import dotEnv from "dotenv";
dotEnv.config();

// connect SMTP server :
const transporter = nodemailer.createTransport({
  service: "gmail", // your service Provider

  auth: {
    user: process.env.MAIL_USER, // sender's mail
    pass: process.env.MAIL_PASS, // sender's mail app passcode
    // dont use your mail account password okey...
  },
});

export const checkisMfa = async (req, res) => {
  try {
    let chek = await User.find({ username: req.body.username });
    console.log("asdkjsadksdlasjkldjkjadblsdnbaksdlkj", chek[0].details.isMFA);
    if (chek[0].details.isMFA) {
      res.status(200).json({
        message: "You already Setup the MFA",
        email: chek[0].details.authEmail,
      });
    } else {
      res.status(201).json({ message: "You need to setup MFA " });
    }
  } catch (error) {
    console.error(
      "error while calling checkisMfa & message is : ",
      error.message
    );
  }
};

export const sendMail = async (req, res) => {
  console.log(req.body.email);
  try {
    const generateSixDigit = () => {
      return Math.floor(100000 + Math.random() * 900000);
    };

    let sixDigit = generateSixDigit();

    const sendMailFunction = async () => {
      const info = await transporter.sendMail({
        from: {
          name: "INMAT", // name you want to display in mail
          address: process.env.MAIL_USER, // sender address
        },
        to: `${req.body.email}`, // list of receivers
        subject: "Multi factor Authentication", // Subject line
        text: `Hii ${req.body.username} your 6 Digit Passcode is`, // plain text body
        html: `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />

    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Email Verification</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
      }
      .container {
        width: 100%;
        padding: 20px;
        background-color: #ffffff;
        max-width: 600px;
        margin: 0 auto;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }
      .header {
        text-align: center;
        background-color: #444444; /* Dark Grey (Primary Color) */
        padding: 10px;
        border-radius: 10px 10px 0 0;
      }
      .header h1 {
        color: #ffe963; /* Yellow Accent Color */
        margin: 0;
        font-size: 24px;
      }
      .content {
        padding: 20px;
        text-align: center;
      }
      .content p {
        font-size: 16px;
        color: #444444;
        margin-bottom: 20px;
      }
      .verification-code {
        font-size: 36px;
        color: #ffe963; /* Yellow Accent Color */
        letter-spacing: 5px;
        background-color: #444444; /* Dark Grey (Primary Color) */
        padding: 10px 20px;
        border-radius: 5px;
        display: inline-block;
      }
      .footer {
        margin-top: 30px;
        text-align: center;
        font-size: 14px;
        color: #888888;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Email Verification</h1>
      </div>
      <div class="content">
      <p>Hii ,${req.body.username}</p>
        <p>
          To complete the verification process, please use the following 6-digit
          code:
        </p>
        <div class="verification-code">${sixDigit}</div>
        <p>This code will expire in 10 minutes.</p>
      </div>
      <div class="footer">
        <p>
          Thank you for using INVMAT. If you did not request this email, please
          ignore it.
        </p>
      </div>
    </div>
  </body>
</html>
`, // html body  & you can pass files also through "attachment" key ..
      });
      console.log("Message sent: %s", info.messageId);
    };
    sendMailFunction();

    res.status(201).json({ digit: sixDigit });
  } catch (error) {
    console.error("Error while calling sendMial api:", error.message);
  }
};

export const digitVerify = async (req, res) => {
  try {
    let user = await User.updateOne(
      { username: req.body.username },
      { $set: { "details.isMFA": true } }
    );
    console.log(user);
    res.status(200).json({ message: "now you are enabled MFA" });
  } catch (error) {
    console.error("Error while calling digitVeryfy:", error.message);
  }
};

export const addMail = async (req, res) => {
  try {
    let user = await User.updateOne(
      { username: req.body.username },
      { $set: { "details.authEmail": req.body.email } }
    );
    let userDetails = await User.findOne({ username: req.body.username });
    console.log("this is updated auth email user", userDetails);

    res.status(200).json({
      message:
        "your Email Added as authEmail , this is for multifactor authentication",
    });
  } catch (error) {
    console.error("Error while calling addmail:", error.message);
  }
};

export const getMail = async (req, res) => {
  console.log("given usernam in req", req.body.username);
  try {
    let user = await User.findOne({ username: req.body.username }).populate(
      "details"
    );
    console.log(user);

    if (user.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log("mail user is ", user.details.authEmail);
    // console.log(user[0].details);

    // send digit to email :

    const generateSixDigit = () => {
      return Math.floor(100000 + Math.random() * 900000);
    };

    let sixDigit = generateSixDigit();

    const sendMailFunction = async () => {
      const info = await transporter.sendMail({
        from: {
          name: "INMAT", // name you want to display in mail
          address: process.env.MAIL_USER, // sender address
        },
        to: `${user.details.authEmail}`, // list of receivers
        subject: "Multi factor Authentication", // Subject line
        text: `Hii ${req.body.username} your 6 Digit Passcode is`, // plain text body
        html: `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />

    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Email Verification</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
      }
      .container {
        width: 100%;
        padding: 20px;
        background-color: #ffffff;
        max-width: 600px;
        margin: 0 auto;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }
      .header {
        text-align: center;
        background-color: #444444; /* Dark Grey (Primary Color) */
        padding: 10px;
        border-radius: 10px 10px 0 0;
      }
      .header h1 {
        color: #ffe963; /* Yellow Accent Color */
        margin: 0;
        font-size: 24px;
      }
      .content {
        padding: 20px;
        text-align: center;
      }
      .content p {
        font-size: 16px;
        color: #444444;
        margin-bottom: 20px;
      }
      .verification-code {
        font-size: 36px;
        color: #ffe963; /* Yellow Accent Color */
        letter-spacing: 5px;
        background-color: #444444; /* Dark Grey (Primary Color) */
        padding: 10px 20px;
        border-radius: 5px;
        display: inline-block;
      }
      .footer {
        margin-top: 30px;
        text-align: center;
        font-size: 14px;
        color: #888888;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Email Verification</h1>
      </div>
      <div class="content">
      <p>Hii, ${req.body.username} Welcome Back in INMATE</p>
        <p class="verification-code">
          To complete the verification process, please use the following 6-digit
          code:
        </p>
        <div class="verification-code">${sixDigit}</div>
        <p>This code will expire in 10 minutes.</p>
      </div>
      <div class="footer">
        <p>
          Thank you for using INVMAT. If you did not request this email, please
          ignore it.
        </p>
      </div>
    </div>
  </body>
</html>
`, // html body  & you can pass files also through "attachment" key ..
      });
      console.log("Message sent: %s", info.messageId);
    };
    sendMailFunction();
    console.log("the meil is sdfskdfn", user.details.authEmail);

    res.status(200).json({
      email: user.details.authEmail,
      digit: sixDigit,
    });
  } catch (error) {
    console.error("Error while calling getMail:", error.message);
  }
};
