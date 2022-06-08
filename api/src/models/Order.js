const { DataTypes } = require('sequelize')

module.exports = function(sequelize){
    return sequelize.define('order', {
      price: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      state: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      quantity: {
          type: DataTypes.INTEGER,
          allowNull: false,
      },
    })
}