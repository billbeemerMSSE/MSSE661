const mysql = require("mysql");
const authQueries = require("./queries/auth.queries");
const shootQueries = require("./queries/shoot.queries");


const connectionLimit  = process.env.DB_LIMIT || 10;

const host = process.env.DB_HOST || "localhost";

const user = process.env.DB_USER || "root";

const password = process.env.DB_PASS || "root";

const database = process.env.DB_DATABASE || "mysql";

// const connection = mysql.createConnection({
//     host, user, password, database
// });

const connection = mysql.createPool({
    connectionLimit, host, user, password, database
});

// connection.connect(function(error) {
connection.getConnection((error, conn) => {
    if (!!error){
        console.log(error);
    } else {
        console.log("Connection Established!");
    }
    conn.release();

    // connection.query(shootQueries.ALL_SHOOTS, (error, result) => {
    //     if (!!error) {
    //         console.log(error);
    //     } else {
    //         console.log(result);
    //     }
    // });

    // connection.query(authQueries.ALL_USERS, (error, result) => {
    //     if (!!error) {
    //         console.log(error);
    //     } else {
    //         console.log(result);
    //     }
    // });
});

module.exports = connection;