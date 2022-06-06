// Importo request y response para tener auto complete
const { request, response } = require("express");
// const { Product } = require("../models");

const getProducts = async (req = request, res = response) => {
  res.json([{ name: "Cocina" }, { name: "Tablet" }]);
  // Product.findAll()
  //   .then((products) => {
  //     console.log(products);
  //     res.json(products);
  //   })
  //   .catch((err) => console.log(err));
};
const postProduct = async (req = request, res = response) => {
  const { name, price } = req.body;

  try {
    const newProduct = await Product.create({ name, price });
    res.json(newProduct);
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
};

module.exports = {
  getProducts,
  postProduct,
};
