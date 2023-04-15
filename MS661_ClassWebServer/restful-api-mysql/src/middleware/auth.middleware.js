const jwt = require("jsonwebtoken");
const jwtconfig = require("../jwt-config");

module.exports = function(request, response, next) {
    const token = request.headers["auth-token"];

    if (!token) {
        response
            .status(401)
            .send({ auth: false, message: "Access Denied!"});
    }
    try {
        const verified = jwt.verify(token, jwtconfig.secret);
        request.user = verified;
        next();
    } catch (error) {
        response
            .status(400)
            .send({ message: "Invalid Token!"});
    }
};