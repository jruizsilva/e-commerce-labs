const { DataTypes, Sequelize } = require("sequelize");
module.exports = function (sequelize) {
  return sequelize.define("product", {
    id: {
      primaryKey: true,
      allowNull: false,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
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
    public_id: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    condition: {
      //nuevo o usado (new, used)
      type: DataTypes.ENUM("new", "used"),
      allowNull: false,
    },
    brand: {
      type: DataTypes.STRING,
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
    category_id: {
      type: DataTypes.STRING,
    },
  });
};
