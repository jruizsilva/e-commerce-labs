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
  // .then(() => {
  //   // Crear usuarios
  //   console.log("Creando usuario...");
  //   users.forEach((user) => User.create(user));
  // })
  .then(() => {
    // Crear categorias
    console.log("Creando categorias...");
    categories.forEach((category) => {
      Category.create(category);
    });
  })
  .then(() => {
    // Llenar db
    console.log("Agregando celulares..");
    celulares.forEach((celular) => {
      Product.create(celular);
    });
  })
  .then(() => {
    console.log("Asignando categoria celulares...");
    setTimeout(async () => {
      const celulares_category = await Category.findOne({
        where: { id: "MLA1051" },
      });
      const products = await Product.findAll({
        where: { category_id: "MLA1051" },
      });
      products.forEach((product) => {
        product.addCategory(celulares_category);
      });
    }, 2000);
  })
  .then(() => {
    // Llenar db
    console.log("Agregando productos de computación..");
    computacion.forEach((product) => {
      Product.create(product);
    });
  })
  .then(() => {
    console.log("Asignando categoria computacion...");
    setTimeout(async () => {
      const computacion_category = await Category.findOne({
        where: { id: "MLA1648" },
      });
      const products = await Product.findAll({
        where: { category_id: "MLA1648" },
      });
      products.forEach((product) => {
        product.addCategory(computacion_category);
      });
    }, 2000);
  });
