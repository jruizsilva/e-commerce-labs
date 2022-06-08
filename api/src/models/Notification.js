const { DataTypes } = require('sequelize')

module.exports = function(sequelize){
    return sequelize.define('notification', {
      message: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    })
}