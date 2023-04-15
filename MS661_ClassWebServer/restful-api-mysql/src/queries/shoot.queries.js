exports.ALL_SHOOTS = "SELECT * FROM MS661ClassApp.shoots";

exports.SINGLE_SHOOT = "SELECT * FROM MS661ClassApp.shoots WHERE shoot_id = ?";

exports.INSERT_SHOOT = "INSERT INTO MS661ClassApp.shoots (client, cater) VALUES (?, ?)";

exports.UPDATE_SHOOT = "UPDATE MS661ClassApp.shoots SET client = ?, cater = ? WHERE shoot_id = ?";

exports.DELETE_SHOOT = "DELETE FROM MS661ClassApp.shoots WHERE shoot_id = ?";
