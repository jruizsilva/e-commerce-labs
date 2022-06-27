const {
  Product,
  Category,
  Question,
  Answer,
  User,
  Order,
  OrderDetail,
} = require("../models/index.js");
// Me traigo el operador de sequelize
const { Op, or } = require("sequelize");
const fs = require("fs-extra");
const {
  uploadImage,
  deleteImage,
} = require("../utils/cloudinary/cloudinary.js");

//      ---- GET DE PRODUCTOS -----

const getProductsByName = async (req, res, next) => {
  console.log(req.query);
  const { name } = req.query;
  console.log(name);
  try {
    // Se fija si hay un nombre y si lo hay trae solo el que coincida con su nombre
    if (name) {
      if (!name) return res.sendStatus(404);
      const product = await Product.findAll({
        where: {
          name: {
            [Op.iLike]: "%" + name + "%",
          },
        },
        include: { model: Category },
      });
      return res.json(product);
    }
    /*  // Si no hay un nombre trae todos los productos
        else{
            const products = await Product.findAll({include: [{model: Category}]});
            if(products) res.status(200).json(products);
        } */
  } catch (error) {
    next(error);
  }
};

const getProducts = async (req, res, next) => {
  const { condition, sort, min_price, max_price, state, name, categoryId } =
    req.query;
  try {
    let where = {
      state: "active",
      stock: {
        [Op.gte]: 1,
      },
    };
    let order;
    if (condition) where.condition = condition;
    if (state) where.state = state;
    // if (travel_cost) where.travel_cost = travel_cost;
    if (min_price || max_price) {
      if (min_price && max_price) {
        where.price = {
          [Op.between]: [min_price, max_price],
        };
      }
      if (min_price && !max_price) {
        where.price = {
          [Op.gte]: min_price,
        };
      }
      if (!min_price && max_price) {
        where.price = {
          [Op.lte]: max_price,
        };
      }
    }

    if (sort === "higher_price") order = [["price", "DESC"]];
    if (sort === "lower_price") order = [["price", "ASC"]];

    // devuelve todos los productos que contenga la categoria con el id enviado
    // busca producto por el nombre que se ingreso en el search anteriormente
    let include = [
      { model: Category },
      {
        model: User,
        attributes: {
          exclude: ["password"],
        },
      },
    ];
    if (categoryId) include[0].where = { id: categoryId };
    if (name) where.name = { [Op.iLike]: "%" + name + "%" };
    // ------------------------------------------------------------------------

    const products = await Product.findAll({
      include,
      where,
      order,
    });
    if (products) res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

const getProductsById = async (req, res, next) => {
  const { productId } = req.params;

  try {
    const product = await Product.findAll({
      include: [
        {
          model: Category,
          model: Question,
          model: User,
          //  model: Answer, // error: answer is not asociated to Question!
        },
      ],
      where: {
        id: productId,
      },
    });
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

// -- Creacion de Producto --
const createProducts = async (req, res, next) => {
  // name price image description condition brand model stock score state
  console.log("llege");
  const {
    name,
    price,
    description,
    condition,
    brand,
    model,
    stock,
    score,
    state,
    categories,
    userId,
    image,
  } = req.body;

  try {
    const user = await User.findByPk(userId);
    console.log(user.__proto__);
    const uploadResponse = await uploadImage(image);
    const product = await Product.create({
      name,
      price,
      image: uploadResponse.secure_url,
      public_id: uploadResponse.public_id,
      description,
      condition,
      brand,
      model,
      stock,
      score,
      state,
      userId,
    });
    const categoriesDb = await Category.findAll({
      where: { id: { [Op.or]: categories } },
    });
    await product.addCategories(categoriesDb);
    await user.addProduct(product);
    return res.send("Successfully created");
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

// Delete product
const deleteProduct = async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findByPk(id);
  await deleteImage(product.public_id);
  await Product.destroy({
    where: {
      id,
    },
  });
  res.json({ message: "Product eliminado" });
};
// Update product
const updateProduct = async (req, res, next) => {
  const { id } = req.params;
  const product = req.body;
  console.log(product);
  console.log(id);
  const productUpdate = await Product.update(product, {
    where: {
      id: id,
    },
  });
  return res.json({ message: "Product Updated", productUpdate });
};

const getReviewsByProductId = async (req, res, next) => {
  const { productId } = req.params;

  const orders = await Order.findAll({
    where: { status: "completed" },
    include: [{ model: Product, where: { id: productId } }],
  });
  const ordersWithReviews = orders.filter((order) => {
    const currentOrderDetails = order.products[0].orderdetail;
    const { score, comment } = currentOrderDetails;
    if (score && comment) return true;
    else return false;
  });
  const reviewsFormated = ordersWithReviews.map((order) => {
    const currentOrderDetails = order.products[0].orderdetail;
    const { id, score, comment } = currentOrderDetails;
    let title;
    switch (score) {
      case 20:
        title = "Terrible";
        break;
      case 40:
        title = "Bad";
        break;
      case 60:
        title = "Average";
        break;
      case 80:
        title = "Great";
        break;
      case 100:
        title = "Perfect";
        break;
    }
    if (score && comment)
      return { id, score, title, comment, userId: order.userId };
  });

  res.json(reviewsFormated);
};

module.exports = {
  getProducts,
  getProductsById,
  getProductsByName,
  createProducts,
  deleteProduct,
  updateProduct,
  getReviewsByProductId,
};
