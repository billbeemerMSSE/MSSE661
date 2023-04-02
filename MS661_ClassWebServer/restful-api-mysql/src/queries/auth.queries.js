//  UPDATE 
// exports.CREATE_USERS_TABLE = `CREATE TABLE IF NOT EXISTS tasks(
//     id int NOT NULL AUTO_INCREMENT,
//     name varchar(255) NOT NULL,
//     created_date DATETIME DEFAULT CURRENT_TIMESTAMP(),
//     status varchar(10) DEFAULT "pending",
//     PRIMARY KEY (id)
//     )`;

exports.ALL_USERS = "SELECT * FROM MS661ClassApp.users";

exports.INSERT_NEW_USER = "INSERT INTO MS661ClassApp.users (username, email, password) VALUES (?, ?, ?)";

exports.UPDATE_USER = "UPDATE MS661ClassApp.users SET username = ?, email = ?, password = ? WHERE user_id = ?";
