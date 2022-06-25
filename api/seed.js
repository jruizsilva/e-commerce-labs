require("dotenv").config();
const { conn } = require("./src/models");
const users = require("./data/format/users");
const categories = require("./data/format/categories");
const celulares = require("./data/format/celulares");
const computacion = require("./data/format/computacion");
const { Product, Category, User } = require("./src/models/index");

conn
  .sync({ force: true })
  .then(() => {
    console.log("base de datos conectada");
  })
  .then(() => {
    // Crear usuarios
    console.log("Creando usuario...");
    users.forEach((user) => User.create(user));
  })
  .then(() => {
    // Crear categorias
    console.log("Creando categorias...");
    categories.forEach((category) => {
      Category.create(category);
    });
  })
  .then(() => {
    // Llenar db
    setTimeout(async () => {
      console.log("Agregando celulares..");
      const user = await User.findByPk("dffaaad9-c172-47fc-b3ac-b035d0d79bb1");
      celulares.forEach(async (celular) => {
        const productToAdd = await Product.create(celular);
        await user.addProduct(productToAdd);
      });
    }, 2000);
  })
  .then(() => {
    setTimeout(async () => {
      console.log("Asignando categoria celulares...");
      const celulares_category = await Category.findOne({
        where: { id: "MLA1051" },
      });
      const products = await Product.findAll({
        where: { category_id: "MLA1051" },
      });
      products.forEach(async (product) => {
        await product.addCategory(celulares_category);
      });
    }, 2000);
  })
  .then(() => {
    // Llenar db
    setTimeout(async () => {
      console.log("Agregando productos de computación..");
      const user = await User.findByPk("dffaaad9-c172-47fc-b3ac-b035d0d79bb1");
      computacion.forEach(async (product) => {
        const productToAdd = await Product.create(product);
        await user.addProduct(productToAdd);
      });
    }, 2000);
  })
  .then(() => {
    setTimeout(async () => {
      console.log("Asignando categoria computacion...");
      const computacion_category = await Category.findOne({
        where: { id: "MLA1648" },
      });
      const products = await Product.findAll({
        where: { category_id: "MLA1648" },
      });
      products.forEach(async (product) => {
        await product.addCategory(computacion_category);
      });
    }, 2000);
  });
