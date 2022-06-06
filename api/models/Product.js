const { DataTypes } = require("sequelize");
const { db } = require("../database/config");

const Product = db.define("product", {
  name: {
    type: DataTypes.STRING,
  },
  price: {
    type: DataTypes.INTEGER,
  },
});

module.exports = Product;
