const { DataTypes } = require('sequelize')

module.exports = function(sequelize){
    return sequelize.define('cart', {
      totalValue: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    })
}