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
      status:{  
            type: DataTypes.ENUM('created', 'processing', 'cancelled', 'completed'),
            allowNull: false
        },
        payment_id:{
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        payment_status:{
            type: DataTypes.STRING,
            defaultValue: ""
        },
        merchant_order_id: {
            type: DataTypes.BIGINT,
            defaultValue: 0
        }
    })
}