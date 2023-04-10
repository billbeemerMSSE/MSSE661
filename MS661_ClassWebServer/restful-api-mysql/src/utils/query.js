module.exports = async (conn, query, params) =>
    new Promise((resolve, reject) => {
        const handler = (error, result) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(result);
        };
        conn.query(query, params, handler);
    });