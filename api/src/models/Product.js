const { DataTypes } = require('sequelize')

module.exports = function(sequelize){
    const Product =  sequelize.define('product', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        brand: {
            type: DataTypes.STRING,
        },
        model: {
            type: DataTypes.STRING,
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        score: {
            type: DataTypes.INTEGER,
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    })
    return Product
}