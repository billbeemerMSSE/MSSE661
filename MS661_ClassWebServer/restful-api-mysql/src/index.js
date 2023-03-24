const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");

const taskRoutes = require("./routes/tasks.routes");
const middleware = require("./middleware/errors.middleware");

const app = express();
const port = process.env.PORT || 3000;
const logLevel = process.env.LOG_LEVEL || "dev";

app.use(logger(logLevel));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/tasks", taskRoutes);
// app.use("/users", userRoutes);

app.use(middleware.error404);
app.use(middleware.error500);

app.listen(port, () => {
    console.log("Running Server on Port %s", port);
});
