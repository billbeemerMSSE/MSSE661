console.log("Hello Week 3");

// const http = require("http");

// const server = http.createServer("/", function(req, res) {

// })

// server.listen(3000)
const PORT = 3000

const express = require("express");
const app = express();

app.use(express.static("public"));
app.use("/css", express.static(__dirname = "/public/css"))
app.use("/js", express.static(__dirname = "/public/src"))

app.listen(PORT, function() {
    console.log("Server at http://localhost:%s", PORT);
});


