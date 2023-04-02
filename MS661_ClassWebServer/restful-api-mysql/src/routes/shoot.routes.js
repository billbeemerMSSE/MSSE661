const controllers = require("../controllers/shoot.controller");
const express = require("express");

const shootRoutes = express.Router();

shootRoutes.get('/', controllers.getAllShoots).post('/', controllers.createShoot);

shootRoutes
    .get('/:taskId', controllers.getShoot)
    .put('/:taskId', controllers.updateShoot)
    .delete('/:taskId', controllers.deleteShoot);

module.exports = shootRoutes;