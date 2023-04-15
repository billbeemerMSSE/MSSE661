const jwt = require("jsonwebtoken");
//const bcrypt = require("bcryptjs");

const connection = require("../db-config");
const jwtconfig = require("../jwt-config");
const userQueries = require("../queries/user.queries");

exports.displayUser = (request, response) => {
    const token = request.headers["auth-token"];
    // console.log("displayUser token : %s", token);

    if (!token) {
        response
            .status(401)
            .send({ auth: false, message: "No Token Provided!"});
            return;
    }

    jwt.verify(token, jwtconfig.secret, (error, decoded) => {
        if (error) {
            response
                .status(500)
                .send({ auth: false, message: "Token Failed Authentication!"});
                return;
        }
        connection.query(userQueries.GET_ME_BY_USER_ID, [decoded.id], (error, user) => {
            if (error) {
                response
                    .status(500)
                    .send({ message: "User could not be found."});
                    return;
            }
            if (!user) {
                response
                    .status(400)
                    .send({ message: "User does not exist."});
                    return;
            }
            response
                .status(200)
                .send(user);
        });
    });
};