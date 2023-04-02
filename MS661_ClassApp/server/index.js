console.log("Hello Week 4");

const express = require("express");
const app = express();

const PORT = process.env.PORT || 4000;

app.use(express.static("public"));
app.use("/css", express.static(__dirname = "/public/css"));
app.use("/js", express.static(__dirname = "/public/src"));

app.listen(PORT, function() {
    console.log("Server at http://localhost:%s", PORT);
});


