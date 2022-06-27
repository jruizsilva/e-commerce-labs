const { User, OrderDetail, Product, Order } = require('../models/index.js');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const config = require('../utils/auth/index');
require('dotenv').config();

let verificationMail = '';

if (process.env.NODE_ENV === 'production')
  verificationMail += 'https://e-commerce-labs.vercel.app';
else verificationMail += 'http://localhost:3000';

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const { purchased = null } = req.body;

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
      expiresIn: '10m',
    });

    verificationMail += `/restore-password/${user.id}/${token}`;

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_SENDER,
        pass: process.env.EMAIL_PASSWORD_SENDER,
      },
    });
    const order = null;
    if (purchased) {
      order = await Order.findOne({
        where: { payment_id: purchased },
        include: [{ model: Product }],
      });
    }

    const emailContent = { content: {} };
    if (purchased) {
      let items = order?.products
        .map(el => {
          return `<div>
                        <p style="text-align: center; font-weight: bold; font-size: 14px">
                          ${el.name}
                        </p>

                        <img
                          style="width: 50%; width: 95px; height: 95px"
                          src="${el.image}"
                        />
                        <span style="float: right">${el.orderdetail.quantity} x ${el.orderdetail.totalprice}</span>
                  </div>`;
        })
        .join('');
      console.log(items);
      emailContent.content = {
        from: '"Ecommerce App" <creadordecaminos@gmail.com>',
        to: email,
        subject: 'Your purchase was completed',
        html:
          `   
                <div style="display: block; margin-left: auto; margin-right: auto; width: 80%; align-items: center;">
                  <div style="background-color: #6ca4ed">
                    <img
                      src="https://i.ibb.co/RPVvPKV/logo.png"
                      alt="logo"
                      width="120px"
                      style="display: block; margin-left: auto; margin-right: auto"
                    />
                  </div>
                  <p style="font-weight: bold">${user.name} your purchase was complete succesfully.</p>
                  <div>
                    <p style="background-color: #6ca4ed; padding: 8px">
                      Order Nº: ${order.payment_id}
                    </p>
                    <div style="border: 1px solid; padding: 10px">` +
          items +
          `  
                    </div>
                    <p
                      style="
                        float: right;
                        border: 1px solid;
                        padding: 10px;
                        margin-bottom: 20px;
                      "
                    >
                      Total = $ ${order.price}
                    </p>
                    <br />
                    <br />
                  </div>
                  <hr />

                  <p style="text-align: center; font-weight: bold; font-size: 14px">
                    Enjoy your purchase, we hope to see you very soon at
                    <a href="e-commerce-labs.vercel.app">e-commerce-labs.vercel.app</a>
                  </p>
                  <hr />
                  <div style=" background-color: #191d23; text-align: center; padding: 20px; color:white"> 
                      <span>Contact us: </span><a href="e-commerce-labs.vercel.app" style="text-decoration: none; color:white;">e-commerce-labs.vercel.app</a>
                  </div>
                </div>
            `,
      };
    } else {
      emailContent.content = {
        from: '"Ecommerce App" <creadordecaminos@gmail.com>',
        to: email,
        subject: 'Forgot password',
        html: `
                <div style="display: block; margin-left: auto; margin-right: auto; width: 80%; align-items: center;">
                  <div style="background-color: #6ca4ed">
                    <img
                      src="https://i.ibb.co/RPVvPKV/logo.png"
                      alt="logo"
                      width="120px"
                      style="display: block; margin-left: auto; margin-right: auto"
                    />
                  </div>
                  <h1 style="font-sixe: 18px; color:#2f80ed;"> This mail was sent because you want to restore your password.</h1>
                  To change your password, please clic the following link:
                  <br>
                  <b>${verificationMail}</b> 
                  </br>
                  <p>...or copy it instead and paste it on your browser.</p>
                  <div style=" margin-top: 20px; background-color: #191d23; text-align: center; padding: 20px; color:white"> 
                      <span>Contact us: </span><a href="e-commerce-labs.vercel.app" style="text-decoration: none; color:white;">e-commerce-labs.vercel.app</a>
                  </div>
              </div>
            `,
      };
    }

    await transporter.sendMail(emailContent.content);

    if (purchased) return res.redirect('http://localhost:3000');
    return res.send('Email was sent successfully. Check your email inbox.');
  } else if (!user) {
    console.log('No existe ningún usuario con ese email');
  }

  res.status(404).send('That Email is not registered.');
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
