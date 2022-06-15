const { DataTypes } = require("sequelize");

module.exports = function (sequelize) {
  return sequelize.define("product", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    condition: {
      //nuevo o usado (new, used)
      type: DataTypes.ENUM("new", "used"),
      allowNull: false,
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    model: {
      type: DataTypes.STRING,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    score: {
      type: DataTypes.INTEGER,
    },
    state: {
      // active - paused
      type: DataTypes.ENUM("active", "paused"),
      allowNull: false,
    },
  });
};
