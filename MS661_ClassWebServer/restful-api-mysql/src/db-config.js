const mysql = require("mysql");
// const authQueries = require("./queries/auth.queries");
// const shootQueries = require("./queries/shoot.queries");

const { ALL_SHOOTS } = require("./queries/shoot.queries");
const { ALL_USERS } = require("./queries/user.queries");

const query = require("./utils/query");

const connectionLimit  = process.env.DB_LIMIT || 10;

const host = process.env.DB_HOST || "localhost";

const user = process.env.DB_USER || "root";

const password = process.env.DB_PASS || "root";

const database = process.env.DB_DATABASE || "mysql";

// const connection = mysql.createConnection({
//     host, user, password, database
// });

const connection = async () =>
    new Promise((resolve, reject) => {
        const conn = mysql.createConnection( {
            host, user, password, database
        });

        conn.connect((error) => {
            if (error) {
                reject(error);
                return;
            }
        });

        resolve(conn);

    });

(async () => {
    const _conn = await connection().catch((error) => {
        throw error;
    });

    const shootTableAll = await query(_conn, ALL_SHOOTS).catch(
        (error) => {
            console.log(error); 
        }
    );

    const userTableAll = await query(_conn, ALL_USERS).catch(
        (error) => {
            console.log(error); 
        }
    );

    if(!!shootTableAll && !!userTableAll) {
        console.log("Display Tables!");
    }

})();
// const connection = mysql.createPool({
//     connectionLimit, host, user, password, database
// });

// // connection.connect(function(error) {
// connection.getConnection(function(error, conn) {
//     if (!!error){
//         console.log(error);
//     } else {
//         console.log("Connection Established!");
//     }
//     conn.release();

//     connection.query(shootQueries.ALL_SHOOTS, function(error, result) {
//         if (!!error) {
//             console.log(error);
//         } else {
//             console.log(result);
//         }
//     });

//     connection.query(authQueries.ALL_USERS, function(error, result) {
//         if (!!error) {
//             console.log(error);
//         } else {
//             console.log(result);
//         }
//     });
// });

module.exports = connection;