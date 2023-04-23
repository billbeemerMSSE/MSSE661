const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('./connection');

const BandGig = sequelize.define('BandGig', {
    date: {
        type: DataTypes.STRING 
    },
    name: {
        type: DataTypes.STRING 
    },
}, {
    timestamps: false
}); 
module.exports = BandGig;