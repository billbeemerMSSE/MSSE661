//UPDATE

// exports.CREATE_TASKS_TABLE = `CREATE TABLE IF NOT EXISTS tasks(
//     id int NOT NULL AUTO_INCREMENT,
//     name varchar(255) NOT NULL,
//     created_date DATETIME DEFAULT CURRENT_TIMESTAMP(),
//     status varchar(10) DEFAULT "pending",
//     PRIMARY KEY (id)
//     )`;

exports.ALL_SHOOTS = "SELECT * FROM MS661ClassApp.shoots";

exports.SINGLE_SHOOT = "SELECT * FROM MS661ClassApp.shoots WHERE shoot_id = ?";

exports.INSERT_SHOOT = "INSERT INTO MS661ClassApp.shoots (client, cater) VALUES (?, ?)";

exports.UPDATE_SHOOT = "UPDATE MS661ClassApp.shoots SET client = ?, cater = ? WHERE shoot_id = ?";

exports.DELETE_SHOOT = "DELETE FROM MS661ClassApp.shoots WHERE shoot_id = ?";


// Executing:
// CREATE TABLE `MS661ClassApp`.`shoots` (
//   `shoot_id` INT NOT NULL AUTO_INCREMENT,
//   `client` VARCHAR(45) NOT NULL,
//   `cater` INT NULL,
//   PRIMARY KEY (`shoot_id`));

// ALTER TABLE `MS661ClassApp`.`shoots` 
// ADD UNIQUE INDEX `client_UNIQUE` (`client` ASC) VISIBLE;