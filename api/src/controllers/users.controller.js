const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const config = require("../utils/auth/index");
const { User } = require("../models/index.js");

const client = new OAuth2Client(config.googleId);

const signUpUser = async (req, res, next) => {
  const { name, email, phone, address, password, role, state } = req.body;
  try {
    const validateEmail = await User.findOne({ where: { email } });
    if (validateEmail)
      return res.status(401).json({ message: "Email already exists" });

    const passwordHash = await bcryptjs.hash(password, 8);
    const user = await User.create({
      name,
      email,
      password: passwordHash,
      phone,
      address,
      role,
      state,
    });
    const token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: "365d",
    });
    res.json({ message: "User created successfully", token, user });
  } catch (error) {
    next(error);
  }
};

const signInUser = async (req, res, next) => {
  try {
    // email: pepe@gmail.com
    // password: 1234
    const { email, password } = req.body;

    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      // el usuario  no existe
      return res.status(401).json({ message: "The email doesn't exists" });
    } else {
      const validate = await bcryptjs.compare(password, user.password);
      if (!validate) {
        return res.status(401).json({ message: "Incorrect password" });
      }
      const token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: "365d",
      });
      return res.json({ message: "signin", token, user });
    }
  } catch (error) {
    next(error);
  }
};

const googleAuth = async (req, res, next) => {
  try {
    const { token } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: config.googleId,
    });

    const { email } = ticket.getPayload();
    const user = await User.findOne({ where: { email: email } });
    if (user && user.id) {
      const token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: "365d",
      });
      return res.status(200).json({ message: "signin", token, user });
    } else {
      return res
        .status(401)
        .json({
          message:
            "There is no user with that email. Please register that email in our database first.",
        });
    }
  } catch (error) {
    next(error);
  }
};

const meUser = (req, res, next) => {
  res.json("me");
};

const getUser = async (req, res, next) => {
  try {
    const { id } = jwt.verify(req.body.token, config.secret);
    const user = await User.findOne({ where: { id } });
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signUpUser,
  signInUser,
  googleAuth,
  getUser,
  meUser,
};
