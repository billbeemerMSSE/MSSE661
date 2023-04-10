// const jwt = require("jsonwebtoken");
// const jwtconfig = require("../jwt-config");

const { jwtconfig, verifyToken } = require("../utils/jwt-helpers");

module.exports = (request, response, next) => {

    // const token = request.headers["auth-token"];

    const authHeader = request.headers["auth-token"] || request.headers["authorization"];
    const accessToken = authHeader.split(" ")[1]

    console.log(accessToken)
;
    if (!accessToken) {
        response
            .status(401)
            .send({ auth: false, message: "Access Denied!"});
    }
    try {
        // const verified = jwt.verify(token, jwtconfig.secret);
        const user = verifyToken(accessToken, jwtconfig.access, request, response);
        request.user = user;
        next();
    } catch (error) {
        response
            .status(403)
            .send({ message: "Invalid Token!"});
    }
};