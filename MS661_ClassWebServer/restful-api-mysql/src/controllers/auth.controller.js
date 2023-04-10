const bcrypt = require("bcryptjs");

const connection = require("../db-config");

const {
    GET_ME_BY_USERNAME,
    GET_ME_BY_USERNAME_WITH_PASSWORD,
    INSERT_NEW_USER,
} = require("../queries/user.queries");

const query = require("../utils/query");

const {
    refreshTokens,
    generateAccessToken,
    generateRefreshToken,
} = require("../utils/jwt-helpers");


// exports.getAllUsers = function(request, response) {
//     connection.query(authQueries.ALL_USERS, function(error, result, fields) {
//         if (error) {
//             response.send(error);
//         }
//         response.json(result);
//     });
// };

exports.registerUser = async (request, response) => {
    const passwordHash = bcrypt.hashSync(request.body.password);
    const params = [request.body.username, request.body.email, passwordHash];

    const conn = await connection().catch((error) => {
        throw error;
    });

    const newUser = await query(conn, GET_ME_BY_USERNAME, [request.params.username]).catch((error) => {
        response
            .status(500)
            .send({ message: "Registered User Not Found"});
        }
    );

    if (newUser.length === 1) {
        response
            .status(403)
            .send({ message: "Registerd User Exists!" });
    } else {
        const result = await query(conn, INSERT_NEW_USER, params).catch((error) => {
            response
                .status(500)
                .send({ message: "Register User Failed." })
        });
        response.send({ message: "Registration Successful!"})
    }
};

exports.loginUser = async (request, response) => {
    const conn = await connection().catch((error) => {
        throw error;
    });

    const user = await query(conn, GET_ME_BY_USERNAME_WITH_PASSWORD, [request.body.username]).catch((error) => {
        response
            .status(500)
            .send({ message: "User Not Found"});
        }
    );

    if (user.length === 1) {
        const validPass = await bcrypt
            .compare(request.body.password, user[0].password)
            // .compare(request.body.password, user.password)
            .catch((error) => {
                response
                    .json(500)
                    .json({ message: "Invalid Password!"});
            });
        if (!validPass) {
            response
                .status(400)
                .send({ message:"Invalid Password!"});
        }
        const accessToken = generateAccessToken(user[0].user_id, {
        // const accessToken = generateAccessToken(user.user_id, {
            expiresIn: 86400,
        });
        const refreshToken = generateRefreshToken(user[0].user_id, {
        // const refreshToken = generateRefreshToken(user.user_id, {
            expiresIn: 86400,
        });

        refreshTokens.push(refreshToken);

        response
            .header("access_token", accessToken)
            .send({ 
                auth: true,
                message: "Logged in Successfully!",
                token_type: "bearer",
                access_token: accessToken,
                expires_in: 86400,
                refresh_token: refreshToken,
        });
    }

};

exports.token = (request, response) => {
    const refreshToken = request.body.token;

    if (!refreshToken) {
        response
            .status(401)
            .send({
                auth: false,
                message: "No Token, Access Denied!"
            });
    }

    if (!refreshTokens.includes(refreshToken)) {
        response
            .status(403)
            .send({ message: "Refresh Token Invalid!"});
    }

    const verified = verifyToken(refreshToken, jwtconfig.refresh, request, response);

    if (verified) {
        const accessToken = generatedToken(user[0].user_id, { expiresIn: 86400 });
        response
            .header("access_token", accessToken)
            .send({ 
                auth: true,
                message: "Logged in Successfully!",
                token_type: "bearer",
                access_token: accessToken,
                expires_in: 20,
                refresh_token: refreshToken,
        });
    }
    response
        .status(403)
        .send({ message: "Token Invalid!"})
};

exports.logoutUser = (request, response) => {
    const refreshToken = request.body.token;
    refreshTokens = refreshTokens.filter((t) => t !== refreshToken);

    response.send({ message: "Successful Logout"});
};
