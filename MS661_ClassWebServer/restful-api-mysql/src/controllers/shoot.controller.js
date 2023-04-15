const connection = require("../db-config");
const shootQueries = require("../queries/shoot.queries");

exports.getAllShoots = function(request, response) {
    connection.query(shootQueries.ALL_SHOOTS, function(error, result, fields) {
        if (error) {
            response.send(error);
        }
        response.json(result);
    });
};

exports.getShoot = function(request, response) {
    connection.query(shootQueries.SINGLE_SHOOT, [request.params.shoot_id], function(error, result) {
        if (error) {
            response.send(error);
        }
        response.json(result);
    });
};

exports.createShoot = function(request, response) {
    connection.query(shootQueries.INSERT_SHOOT, [request.body.client], [request.body.cater], function(error, result) {
        if (error) {
            response.send(error);
        }
        console.log(result);
        response.json({ message: "Number inserted: " + result.affectedRows });
    });
};

exports.updateShoot = function(request, response) {
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

exports.deleteShoot = function(request, response) {
    connection.query(shootQueries.DELETE_SHOOT, [request.params.shoot_id], function(error) {
        if (error) {
            response.send(error);
        }
        response.json({ message: "Delete Successful!"});
    });
};