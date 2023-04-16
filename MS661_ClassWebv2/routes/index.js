const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/auth.controller');
const ShootController = require('../controllers/shoot.controller');
const ErrorHandler = require('../middleware/error.middleware');
const AuthGuard = require('../middleware/auth.middleware');
const schema = require('../validatons/auth.validation');
const validate = require('../utils/validator.util'); 

router.post('/register', validate(schema.register), ErrorHandler(AuthController.register));
router.post('/login', validate(schema.login), ErrorHandler(AuthController.login));
router.get('/user', AuthGuard, ErrorHandler(AuthController.getUser));
router.put('/user', AuthGuard, ErrorHandler(AuthController.updateUser));
router.get('/logout', AuthGuard, ErrorHandler(AuthController.logout));

router.get('/shoot', AuthGuard, ErrorHandler(ShootController.getAllShoots));
router.post('/shoot', AuthGuard, ErrorHandler(ShootController.createShoot));

router
    .get('/shoot/:id', AuthGuard, ErrorHandler(ShootController.getShoot))
    .put('/shoot/:id', AuthGuard, ErrorHandler(ShootController.updateShoot))
    .delete('/shoot/:id', AuthGuard, ErrorHandler(ShootController.deleteShoot));

router.all('*',  (req, res) => res.status(400).json({ message: 'Bad Request.'}))

module.exports = router;
