const connection = require("../db-config");
// const shootQueries = require("../queries/shoot.queries");

const {
    ALL_SHOOTS,
    SINGLE_SHOOT,
    INSERT_SHOOT,
    UPDATE_SHOOT,
    DELETE_SHOOT,
} = require("../queries/shoot.queries");
const query = require("../utils/query");


exports.getAllShoots = async (request, response) => {
    const conn = await connection().catch((error) => {
        throw error;
    });

    const allShoots = await query(conn, ALL_SHOOTS).catch((error) => {
        response.send(error);
    });

    if (allShoots.length) {
        response.json(allShoots); 
    }
};

exports.getShoot = async (request, response) => {
    const conn = await connection().catch((error) => {
        throw error;
    });

    const singleShoot = await query(conn, SINGLE_SHOOT, [request.params.shoot_id]).catch((error) => {
        response.send(error);
    });

    if (singleShoot.length) {
        response.json(singleShoot); 
    }
};

exports.createShoot = async (request, response) => {
    // const decoded = request.user;

    // console.log("decoded %s", decoded)
    
    // if (decoded.id) {
        const conn = await connection().catch((error) => {
            throw error;
        });

        const insertShoot = await query(conn, INSERT_SHOOT, [request.body.client, request.body.cater]).catch((error) => {
            response.send(error);
        });
        console.log(insertShoot);

        if (insertShoot.affectedRows === 1) {
            response.json({ message: "New Shoot added successfully!"}); 
        }
    // }
};

exports.updateShoot = async (request, response) => {
    const conn = await connection().catch((error) => {
        throw error;
    });
    
    const existingShoot = await query(conn, UPDATE_SHOOT, [
        request.body.client,
        request.body.cater,
        request.params.shoot_id,
    ]).catch((error) => {
        response.send(error);
    });

    if (existingShoot.affectedRows === 1) {
        response.json({ message: "Shoot updated successfully!"}); 
    }
};

exports.deleteShoot = async (request, response) => {
    const conn = await connection().catch((error) => {
        throw error;
    });

    const removeShoot = await query(conn, DELETE_SHOOT, [request.params.shoot_id]).catch((error) => {
        response.send(error);
    });
    
    if (removeShoot.affectedRows === 1) {
        response.json({ message: "Shoot deleted successfully!"}); 
    }
};


