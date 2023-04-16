const ShootModel = require('../models/shoot.model');
const jwtConfig = require('../config/jwt.config');
const cache = require('../utils/cache.util');
const jwt = require('../utils/jwt.util');
const bcrypt = require('bcrypt');

exports.getAllShoots = async (req, res) => {
    const allShoots = await ShootModel.findAll();
    return res.json(allShoots);
}

exports.getShoot = async (req, res) => {
    const oneShoot = await ShootModel.findByPk(req.params.id);
    return res.json(oneShoot);
}

exports.createShoot = async (req, res) => {
    const newShoot = await ShootModel.create({client: req.body.client, cater: req.body.cater});
    return res.json(newShoot);
}

exports.updateShoot = async (req, res) => {
    const updateShoot = await ShootModel.update({client: req.body.client, cater: req.body.cater}, {
        where: {
            id: req.params.id
        }
    });
    return res.json(updateShoot);
}

exports.deleteShoot = async (req, res) => {
    const deleteShoot = await ShootModel.destroy({
        where: {
            id: req.params.id
        }
    });
    return res.json(deleteShoot);
}