const BandGigModel = require('../models/bandGig.model');
const jwtConfig = require('../config/jwt.config');
const cache = require('../utils/cache.util');
const jwt = require('../utils/jwt.util');
const bcrypt = require('bcrypt');

const { serverError } = require("../utils/handlers");

exports.getAllBandGigs = async (req, res) => {
    const allBandGigs = await BandGigModel.findAll().catch(serverError(res));

    if (!allBandGigs.length) {
        return res.status(400).json({ message: "No data available."})
    }

    return res.json(allBandGigs);
}

exports.getBandGig = async (req, res) => {
    const oneBandGig = await BandGigModel.findByPk(req.params.id).catch(serverError(res));
    return res.json(oneBandGig);
}

exports.createBandGig = async (req, res) => {
    const newBandGig = await BandGigModel.create({date: req.body.bandGig_date, name: req.body.bandGig_name}).catch(serverError(res));
    return res.json(newBandGig);
}

exports.updateBandGig = async (req, res) => {
    const updateBandGig = await BandGigModel.update({date: req.body.bandGig_date, name: req.body.bandGig_name}, {
        where: {
            id: req.params.id
        }
    }).catch(serverError(res));
    return res.json(updateBandGig);
}

exports.deleteBandGig = async (req, res) => {
    const deleteBandGig = await BandGigModel.destroy({
        where: {
            id: req.params.id
        }
    }).catch(serverError(res));
    return res.json(deleteBandGig);
}