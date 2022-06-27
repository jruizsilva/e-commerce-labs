const { DataTypes } = require("sequelize");

module.exports = function (sequelize) {
  return sequelize.define("order", {
    status: {
      type: DataTypes.ENUM("created", "processing", "cancelled", "completed"),
      allowNull: false,
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    street_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    street_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    zip_code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    payment_id: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
    },
    payment_status: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    merchant_order_id: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
    },
  });
};
