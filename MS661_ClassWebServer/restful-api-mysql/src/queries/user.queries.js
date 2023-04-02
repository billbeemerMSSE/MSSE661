exports.GET_ME_BY_USER_ID = "SELECT user_id, username, email FROM MS661ClassApp.users WHERE user_id = ?";

exports.GET_ME_BY_USERNAME = "SELECT user_id, username, email FROM MS661ClassApp.users WHERE username = ?";

exports.GET_ME_BY_USER_ID_WITH_PASSWORD = "SELECT * FROM MS661ClassApp.users WHERE user_id = ?";

exports.GET_ME_BY_USERNAME_WITH_PASSWORD = "SELECT * FROM MS661ClassApp.users WHERE username = ?";

