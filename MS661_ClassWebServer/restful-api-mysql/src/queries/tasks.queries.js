exports.CREATE_TASKS_TABLE = `CREATE TABLE IF NOT EXISTS tasks(
    id int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    created_date DATETIME DEFAULT CURRENT_TIMESTAMP(),
    status varchar(10) DEFAULT "pending",
    PRIMARY KEY (id)
    )`;

exports.ALL_TASKS = "SELECT * FROM mauisugar.tasks";

exports.SINGLE_TASK = "SELECT * FROM mauisugar.tasks WHERE id = ?";

exports.INSERT_TASK = "INSERT INTO mauisugar.tasks (name) VALUES (?)";

exports.UPDATE_TASK = "UPDATE mauisugar.tasks SET name = ?, status = ? WHERE id = ?";

exports.DELETE_TASK = "DELETE FROM mauisugar.tasks WHERE id = ?";
