const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const config = require("../utils/auth/index");

const {
  User,
  Product,
  Category,
  Order,
  ProductCart,
  Cart,
  OrderDetail,
} = require("../models/index.js");

const { Op } = require("sequelize");
const {
  uploadImage,
  deleteImage,
} = require("../utils/cloudinary/cloudinary.js");
//const OrderDetail = require("../models/OrderDetail");

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
    if(!name|| !email||!password) return res.json({ message: "Name, email and password are required" });
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
    console.log(user);
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
    const user = await User.findOne({
      where: { id },
      attributes: {
        exclude: ["password"],
      },
    });
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  const id = req.params.userId;
  try {
    if (!req.body.password) {
      const user = await User.update(req.body, {
        where: {
          id,
        },
      });
      // console.log("🚀 ~ file: users.controller.js ~ line 146 ~ updateUser ~ user", user)
      if(!user[0]){
        console.log("No se encontró ningún usuario con ese ID");
        return res.send({message: "No user found. Nothing was updated. Also, no password was recived"})
      } else if(user[0] > 0){
        console.log("Se actualizó " + user[0] + " usuario");
      }
      return res.json({message: "Updated successfully!"})
    }else{
      //console.log(req.body.password)
      req.body.password = await bcryptjs.hash(req.body.password, 8);
      //console.log(req.body.password)
      const user = await User.update(req.body, {
        where: {
          id,
        }
      })
      if(!user[0]){
        console.log("No se encontró ningún usuario con ese ID");
        return res.send({message: "No user found. Nothing was updated."})
      } else if(user[0] > 0){
        console.log("Se actualizó " + user[0] + " usuario");
      }
      return res.json({message: "Updated successfully!"}) 
    }
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
    let include = [{ model: Category }];
    const publications = await Product.findAll({ include, where });
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
    let include = [{ model: Category }];
    const where = { id: publicationId, userId };
    const userPublication = await Product.findOne({ include, where });
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
    res.json({ results: userPublication, message: "Updated successfully!" });
  } catch (error) {
    console.log(error);
    res.send("error:", error);
  }
};

const getMyPurchases = async (req, res, next) => {
  const { userId } = req.params;
  const orders = await Order.findAll({
    where: {
      status: "completed",
      userId,
    },
    include: [
      {
        model: Product,
        include: [
          {
            model: User,
            attributes: {
              exclude: ["password"],
            },
          },
        ],
      },
    ],
  });
  const my_purchases = [];
  orders.forEach(({ products }) => {
    products.forEach((p) => my_purchases.push(p));
  });

  res.json(my_purchases);
};

const addReview = async (req, res, next) => {
  console.log(req.body);
  console.log(req.params);
  const { userId, productId } = req.params;
  const review = req.body;
  console.log("USUARIO ID :", userId);
  console.log("PRODUCTO ID :", productId);
  console.log("REVIEW :", review);
  const order = await Order.findOne({
    where: {
      userId,
    },
  });
  await OrderDetail.update(review, {
    where: {
      productId,
      orderId: order.id,
    },
  });
  //console.log(order.toJSON())
  res.json({ message: "Review added successfully" });
};

const getMySales = async (req, res, next) => {
  const { userId } = req.params;
  const { state } = req.query;

  const orders = await Order.findAll({
    where: { status: "completed" },
    include: [{ model: Product, where: { userId } }, { model: User }],
  });
  let mySales = [];
  if (state) {
    orders.forEach((order) => {
      const { products, user } = order;
      products.forEach((product) => {
        if (product.orderdetail.state === state) {
          mySales.push({ order, product, buyer: user });
        }
      });
    });
  } else {
    orders.forEach((order) => {
      const { products, user } = order;
      products.forEach((product) => {
        mySales.push({ order, product, buyer: user });
      });
    });
  }

  res.json(mySales);
};

const updateOrderdetailsState = async (req, res, next) => {
  const { id } = req.params;
  const { state } = req.body;

  await OrderDetail.update(
    { state },
    {
      where: {
        id,
      },
    }
  );
  res.json({ message: "State changed successfully" });
};

module.exports = {
  signUpUser,
  signInUser,
  googleAuth,
  getUser,
  meUser,
  getPublicationsByUserId,
  putPublicationById,
  getMyPurchases,
  addReview,
  updateUser,
  getMySales,
  updateOrderdetailsState,
};
