// const controller = require("../controllers/shoot.controller");
const express = require("express");

const {
    getAllShoots,
    createShoot,
    getShoot,
    updateShoot,
    deleteShoot,
} = require("../controllers/shoot.controller");

const canAccess = require("../middleware/auth.middleware");

const shootRoutes = express.Router();

shootRoutes.get('/', getAllShoots).post('/', createShoot);
// shootRoutes.get('/', canAccess, getAllShoots).post('/', canAccess, createShoot);


shootRoutes
    .get('/:shoot_id', getShoot)
    .put('/:shoot_id', updateShoot)
    .delete('/:shoot_id', deleteShoot);

// shootRoutes
//     .get('/:shoot_id', canAccess, getShoot)
//     .put('/:shoot_id', canAccess, updateShoot)
//     .delete('/:shoot_id', canAccess, deleteShoot);

module.exports = shootRoutes;