const UserModel = require('../models/user.model');
const jwtConfig = require('../config/jwt.config');
const cache = require('../utils/cache.util');
const jwt = require('../utils/jwt.util');
const bcrypt = require('bcrypt');

const { serverError } = require("../utils/handlers");

exports.register = async (req, res) => {
    const isExist = await UserModel.findOne({
        where:{
            email: req.body.email
        }
    }).catch(serverError(res));
    if(isExist) {
        return res.status(400).json({ message: 'Email already exists.' });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = await UserModel.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    }).catch(serverError(res));
    return res.json(user);
}

exports.login = async (req, res) => {
    const user = await UserModel.findOne({
        where: {
            email: req.body.email
        },
        raw : true
    }).catch(serverError(res));
    if (user) {
        const isMatched = await bcrypt.compare(req.body.password, user.password);
        if (isMatched) {
            const token = await jwt.createToken({ id: user.id });
            return res.json({
                isAuth: true,
                token: token,
                token_type: 'Bearer',
                expires_in: jwtConfig.ttl
            });
        }
    }
    return res.status(400).json({ 
        isAuth: false,
        message: 'Unauthorized',
     });
}

exports.getUser = async (req, res) => {
    const user = await UserModel.findByPk(req.user.id).catch(serverError(res));
    return res.json(user);
}

exports.updateUser = async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const updateUser = await UserModel.update({
        name: req.body.name,
        password: hashedPassword
        }, {
        where: {
            email: req.body.email
        }
    }).catch(serverError(res));
    return res.json(updateUser);
}

exports.logout = async (req, res) => { 
    const token = req.token;
    const now = new Date();
    const expire = new Date(req.user.exp);
    const milliseconds = now.getTime() - expire.getTime();
    /* ----------------------------- BlackList Token ---------------------------- */
    await cache.set(token, token, milliseconds);

    return res.json({ message: 'Logged out successfully' });
}