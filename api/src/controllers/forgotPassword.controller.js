const { User } = require("../models/User");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const forgotPassword = (req, res) =>  {
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'heber.hudson18@ethereal.email',
            pass: 'yuSy6mqFPHU66Ya1b2'
        }
    });

    const mailOptions = {
        from: "Remitente",
        to: "creadordecaminos@live.com.ar",
        subject: "Restore your password // Ecommerce",
        text: "Probando ando",
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if(error) {
            res.status(500).send(error.message);
        } else {
            console.log("Email enviado");
            res.status(200).json(req.body);
        }
    })
}

module.exports = {
    forgotPassword
}