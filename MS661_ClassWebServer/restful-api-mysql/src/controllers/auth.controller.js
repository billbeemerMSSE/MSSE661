const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const connection = require("../db-config");
const jwtconfig = require("../jwt-config");
const authQueries = require("../queries/auth.queries");
const userQueries = require("../queries/user.queries");

exports.getAllUsers = (request, response) => {
    connection.query(authQueries.ALL_USERS, function(error, result, fields) {
        if (error) {
            response.send(error);
        }
        response.json(result);
    });
};

exports.registerUser = (request, response) => {
    const passwordHash = bcrypt.hashSync(request.body.password);

    connection.query(
        authQueries.INSERT_NEW_USER,
        [request.body.username, request.body.email, passwordHash],
        function(error, result) {
            if (error) {
                // console.log(error);
                response
                    .status(500)
                    .send({ message: "Register User Failed."});
                    return;
            }
            connection.query(
                userQueries.GET_ME_BY_USERNAME, 
                [request.body.username],
                function(error, user) {
                    if (error) {
                        response
                            .status(500)
                            .send({ message: "Registered User Not Found."});
                            return;
                    }

                    console.log(user);
                    response.status(200);
                    response.send({ message: "Registration Successful!" });
                });
            
        }
    );
};

exports.loginUser = (request, response) => {
    connection.query(
        userQueries.GET_ME_BY_USERNAME_WITH_PASSWORD,
        [request.body.username],
        function(error, user) {
            if (error) {
                response
                    .status(500)
                    .send({ message: "Login User Not Found."});
                    return;
            }
            console.log(user);
            bcrypt
                .compare(request.body.password, user[0].password)
                .then(function(validPassword) {
                    if (!validPassword) {
                        response
                            .status(400)
                            .send({ message: "Password Invalid!"});
                            return;
                    }
                    const token = jwt.sign({ id: user[0].user_id }, jwtconfig.secret);
                    response
                        .header("auth-token", token)
                        .send({ auth: true, message: "Successful Login!"});
                })
                .catch(console.log);
        }
    );
};


exports.updateUser = function(request, response) {
    connection.query(
        userQueries.GET_ME_BY_USER_ID_WITH_PASSWORD,
        [request.user.id],
        function(error, user) {
            console.log(error, user);
            if (error) {
                response
                    .status(500)
                    .send({ message: "Update Login User Not Found."});
            }

            const passwordHash = bcrypt.hashSync(request.body.password);
            //update

            connection.query(
                authQueries.UPDATE_USER,
                [request.body.username, request.body.email, passwordHash, request.user.id],
                function(error, result) {
                    if (error) {
                        console.log(error);
                        response
                            .status(500)
                            .send({ message: "Update User Failed!"});
                    }
                    response.json({ message: "User Update Successful!"});
                }
            );
        }
    );
};
