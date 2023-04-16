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

// exports.updateShoot = async (req, res) => {
//     const shoot = await ShootModel.findByPk(req.shoot.id);
//     return res.json(shoot);
// }

// exports.deleteShoot = async (req, res) => {
//     const shoot = await ShootModel.findByPk(req.shoot.id);
//     return res.json(shoot);
// }

// exports.getAllShoots = async (req, res) => {
//     const isExist = await UserModel.findOne({
//         where:{
//             email: req.body.email
//         }
//     })
//     if(isExist) {
//         return res.status(400).json({ message: 'Email already exists.' });
//     }
//     const hashedPassword = await bcrypt.hash(req.body.password, 10);

//     const user = await UserModel.create({
//         name: req.body.name,
//         email: req.body.email,
//         password: hashedPassword
//     });
//     return res.json(user);
// }