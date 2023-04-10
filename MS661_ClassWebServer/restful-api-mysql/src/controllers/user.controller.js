const bcrypt = require("bcryptjs");

const connection = require("../db-config");

const query = require("../utils/query");
const {
    GET_ME_BY_USER_ID,
    GET_ME_BY_USER_ID_WITH_PASSWORD,
    UPDATE_USER,
} = require("../queries/user.queries");

exports.getUser = async (request, response) => {
    console.log(request)
    console.log(request.user)
    const decoded = request.user;
    console.log("decoded %s", decoded);

    if (decoded.id) {
        const conn = await connection().catch((error) => {
            throw error;
        });

        const user = await query(conn, GET_ME_BY_USER_ID, [decoded.id]).catch((error) => {
            response
                .status(500)
                .send({ message: "User could not be found." });
            }
        );
        if (!user.length) {
            response
                .status(400)
                .send({ message: "User does not exist."});
        }
        response
            .status(200)
            .send(user)
    }
};

exports.updateUser = async (request, response) => {
    const conn = await connection().catch((error) => {
        throw error;
    });

    const user = await query(conn, GET_ME_BY_USER_ID_WITH_PASSWORD, [
        request.user_id,
    ]).catch((error) => {
        response
            .status(500)
            .send({ message: "User could not be found to update."})
    });

    const passwordUnchanged = await bcrypt
        .compare(request.body.password, user.password)
        .catch((error) => {
            response
                .json(500)
                .json({ message: "Invalid Password!"});
        });
    if (!passwordUnchanged) {
        const passwordHash = bcrypt.hashSync(request.body.password);

        const result = await query(conn, UPDATE_USER, [
            request.body.username,
            request.body.email,
            passwordHash,
            user[0].user_id,
        ]).catch((error) => {
            response
                .status(500)
                .send({ message: "User could not be updated."});
        });

        if (result.affecteRows === 1) {
            response.json({ message: "User Updated Successfully!"});
        }
        response.json({ message: "Nothing to update..."});
    }

};

