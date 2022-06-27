const { DataTypes, Sequelize } = require("sequelize");

module.exports = function (sequelize) {
  return sequelize.define("user", {
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
    },
    bank_account: {
      type: DataTypes.TEXT,
    },
    address: {
      type: DataTypes.STRING,
    },
    profile_image: {
      type: DataTypes.TEXT,
    },
    role: {
      type: DataTypes.STRING, // Podria tener una propiedad ENUM
    },
    state: {
      type: DataTypes.STRING, // Podria tener una propiedad ENUM
    },
  });
};
