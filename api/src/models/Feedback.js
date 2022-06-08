const { DataTypes } = require('sequelize')

module.exports = function(sequelize){
    return sequelize.define('feedback', {
      score: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      comment: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    })
}