const { User } = require("../models/index.js");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const config = require("../utils/auth/index");
require("dotenv").config();

let verificationMail = "";

if (process.env.NODE_ENV === "production")
  verificationMail += "https://e-commerce-labs.vercel.app";
else verificationMail += "http://localhost:3000";

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  console.log(email);
  // console.log("🚀 ~ file: forgotPassword.controller.js ~ line 10 ~ forgotPassword ~ email", email);

  const user = await User.findOne({
    where: {
      email,
    },
  });
  // console.log("🚀 ~ file: forgotPassword.controller.js ~ line 17 ~ forgotPassword ~ user", user);
  // console.log("Id del usuario " + user.name + ":", user.id);

  if (user && user !== {}) {
    // console.log("Encontré un usuario con ese email: ", user);
    // console.log("ID: ", user.id);
    const token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: "10m",
    });

    verificationMail += `/restore-password/${user.id}/${token}`;

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_SENDER,
        pass: process.env.EMAIL_PASSWORD_SENDER,
      },
    });

    await transporter.sendMail({
      from: '"Ecommerce App" <creadordecaminos@gmail.com>',
      to: email,
      subject: "Forgot password",
      html: `
                <h1>This mail was sent because you want to restore your password.</h1>
                To change your password, please clic the following link:
                <br>
                 <b>${verificationMail}</b> 
                </br>
                ...or copy it instead and paste it on your browser.
            `,
    });

    return res.send("Email was sent successfully. Check your email inbox.");
  } else if (!user) {
    console.log("No existe ningún usuario con ese email");
  }

  res.status(404).send("That Email is not registered.");
  // res.send("That Email is not registered.");
};

const passwordRestauration = async (req, res) => {
  const { token } = req.params;

  res.send(token);
};

module.exports = {
  forgotPassword,
  passwordRestauration,
};
