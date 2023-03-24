const mysql = require("mysql");
const queries = require("./queries/tasks.queries");

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
connection.getConnection(function(error, conn) {
    if (!!error){
        console.log(error);
    } else {
        console.log("Connection Established!");
    }
    conn.release();

    connection.query(queries.ALL_TASKS, function(error, result) {
        if (!!error) {
            console.log(error);
        } else {
            console.log(result);
        }
    });
});

module.exports = connection;