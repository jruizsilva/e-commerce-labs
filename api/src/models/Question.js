const { DataTypes } = require('sequelize')

module.exports = function(sequelize){
    return sequelize.define('question', {
      question: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    })
}