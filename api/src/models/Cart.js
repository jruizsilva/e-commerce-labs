const { DataTypes, Sequelize } = require("sequelize");

module.exports = function (sequelize) {
  return sequelize.define("cart", {
    totalValue: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};
