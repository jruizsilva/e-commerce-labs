const { DataTypes } = require('sequelize')

module.exports = function(sequelize){
  return sequelize.define('answer', {
    answer: {
      type: DataTypes.STRING,
      allowNull: false,
  }
  })
}