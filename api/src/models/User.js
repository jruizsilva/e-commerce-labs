const { DataTypes } = require('sequelize')

module.exports = function(sequelize){
    return sequelize.define('user', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      phone: {
          type: DataTypes.STRING,
      },
      address: {
          type: DataTypes.STRING
      },
      profileImage: {
          type: DataTypes.TEXT
      },
      role: {
          type: DataTypes.STRING, // Podria tener una propiedad ENUM
      },
      state: {
        type: DataTypes.STRING, // Podria tener una propiedad ENUM
      }
    })
}