const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");

const authRoutes = require("./routes/auth.routes");
const shootRoutes = require("./routes/shoot.routes");
// const userRoutes = require("./routes/user.routes");

const middleware = require("./middleware/errors.middleware");

const app = express();
const port = process.env.PORT || 3000;
const logLevel = process.env.LOG_LEVEL || "dev";
const env = process.env.NODE_ENV;

app.use(logger(logLevel));
// if (env != "test") {
//     app.use(logger(logLevel));
// }


// const corsOptions = {
//     origin: "http://localhost:4000"
// };

// app.use(cors(corsOptions));
app.use(cors());


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// API endpoints
app.use("/api/auth", authRoutes);
app.use("/api/shoot", shootRoutes);
// app.use("/api/user", userRoutes);

// error handling
app.use(middleware.error404);
app.use(middleware.error500);

// server port
app.listen(port, () => {
    console.log("Running Server on Port %s", port);
});
