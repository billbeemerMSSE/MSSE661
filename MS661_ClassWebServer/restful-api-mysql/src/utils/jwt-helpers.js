const jwt = require("jsonwebtoken");

const jwtconfig = {
    access: "supersecretaccess",
    refresh: "supersecretrefresh",
};

const refreshTokens = [];

const generateAccessToken = (id, expiresIn) =>
    jwt.sign({ id }, jwtconfig.access, expiresIn);

const generateRefreshToken = (id, expiresIn) =>
    jwt.sign({ id }, jwtconfig.refresh, expiresIn);

const verifyToken = (token, secret, request, response) => {
    try {
        return jwt.verify(token, secret);
    } catch {
        response
            .status(500)
            .send({ auth: false, message: "Token Invalid."});
    }
};

module.exports = {
    jwtconfig,
    refreshTokens,
    generateAccessToken,
    generateRefreshToken,
    verifyToken,
};