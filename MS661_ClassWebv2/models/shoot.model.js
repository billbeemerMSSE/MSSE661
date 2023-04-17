const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('./connection');

const Shoot = sequelize.define('Shoot', {
    client: {
        type: DataTypes.STRING 
    },
    cater: {
        type: DataTypes.INTEGER 
    },
}, {
    timestamps: false
}); 
module.exports = Shoot;