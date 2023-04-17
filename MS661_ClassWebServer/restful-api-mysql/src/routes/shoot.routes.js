const controllers = require("../controllers/shoot.controller");
const express = require("express");

const shootRoutes = express.Router();

shootRoutes.get('/', controllers.getAllShoots).post('/', controllers.createShoot);

shootRoutes
    .get('/:shoot_id', controllers.getShoot)
    .put('/:shoot_id', controllers.updateShoot)
    .delete('/:shoot_id', controllers.deleteShoot);

module.exports = shootRoutes;