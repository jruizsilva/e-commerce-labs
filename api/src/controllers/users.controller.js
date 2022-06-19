const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const config = require("../utils/auth/index");
const { User, Product, Category } = require("../models/index.js");
const { Op } = require("sequelize");
const {
  uploadImage,
  deleteImage,
} = require("../utils/cloudinary/cloudinary.js");

const client = new OAuth2Client(config.googleId);

const signUpUser = async (req, res, next) => {
  const {
    name,
    email,
    phone,
    address,
    password,
    role,
    state = "active",
  } = req.body;
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
    console.log(user);
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
      return res.status(401).json({
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

const getPublicationsByUserId = async (req, res, next) => {
  const { userId } = req.params;
  const { state } = req.query;

  const where = { userId };

  if (state) where.state = state;

  try {
    const publications = await Product.findAll({ where });
    res.json(publications);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

const putPublicationById = async (req, res, next) => {
  const { userId, publicationId } = req.params;
  const {
    name,
    price,
    stock,
    condition,
    categories,
    state,
    brand,
    model,
    description,
    image,
  } = req.body;

  try {
    const where = { id: publicationId, userId };
    const userPublication = await Product.findOne({ where });
    if (image) {
      await deleteImage(userPublication.public_id);
      const uploadResponse = await uploadImage(image);
      userPublication.set({
        name,
        price,
        stock,
        condition,
        state,
        brand,
        model,
        description,
        image: uploadResponse.secure_url,
        public_id: uploadResponse.public_id,
      });
    } else {
      await userPublication.set({
        name,
        price,
        stock,
        condition,
        state,
        brand,
        model,
        description,
      });
    }
    await userPublication.save();
    const categoriesDb = await Category.findAll({
      where: { id: { [Op.or]: categories } },
    });
    userPublication.setCategories(categoriesDb);
    res.send("Updated successfully!");
  } catch (error) {
    console.log(error);
    res.send("error:", error);
  }
};

module.exports = {
  signUpUser,
  signInUser,
  googleAuth,
  getUser,
  meUser,
  getPublicationsByUserId,
  putPublicationById,
};
