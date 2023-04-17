const connection = require("../db-config");
const shootQueries = require("../queries/shoot.queries");

exports.getAllShoots = (request, response) => {
    connection.query(shootQueries.ALL_SHOOTS, function(error, result, fields) {
        if (error) {
            response.send(error);
        }
        response.json(result);
    });
};

exports.getShoot = (request, response) => {
    connection.query(shootQueries.SINGLE_SHOOT, [request.params.shoot_id], function(error, result) {
        if (error) {
            response.send(error);
        }
        response.json(result);
    });
};

exports.createShoot = (request, response) => {
    // connection.query(shootQueries.INSERT_SHOOT, [request.body.client], [request.body.cater], function(error, result) {
    connection.query(shootQueries.INSERT_SHOOT, [request.body.client, request.body.cater], function(error, result) {
        if (error) {
            response.send(error);
        }
        console.log(result);
        response.json({ message: "New Shoot added successfully!"});
    });
};

exports.updateShoot = (request, response) => {
    connection.query(shootQueries.UPDATE_SHOOT, 
                     [request.body.client, 
                     request.body.cater, 
                     request.params.shoot_id], 
                     function(error, result) {
        if (error) {
            response.send(error);
        }
        response.json(result);
    });
};

exports.deleteShoot = (request, response) => {
    connection.query(shootQueries.DELETE_SHOOT, [request.params.shoot_id], function(error) {
        if (error) {
            response.send(error);
        }
        response.json({ message: "Delete Successful!"});
    });
};