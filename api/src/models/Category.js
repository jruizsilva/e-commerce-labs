const { DataTypes } = require("sequelize");

module.exports = function (sequelize) {
  return sequelize.define("category", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
