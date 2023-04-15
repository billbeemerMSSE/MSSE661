exports.ALL_USERS = "SELECT * FROM MS661ClassApp.users";

exports.INSERT_NEW_USER = "INSERT INTO MS661ClassApp.users (username, email, password) VALUES (?, ?, ?)";

exports.UPDATE_USER = "UPDATE MS661ClassApp.users SET username = ?, email = ?, password = ? WHERE user_id = ?";
