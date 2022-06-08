const { DataTypes } = require('sequelize')

module.exports = function(sequelize){
      const Category = sequelize.define('category', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
    })
    return Category
}
