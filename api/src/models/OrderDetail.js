const { DataTypes } = require('sequelize')

module.exports = function(sequelize){
    return sequelize.define('orderdetail', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      score: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      comment: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      state: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      quantity: {
          type: DataTypes.INTEGER,
          allowNull: false,
      },
      totalprice: {
          type: DataTypes.STRING,
          allowNull: false,
      },
    })
}