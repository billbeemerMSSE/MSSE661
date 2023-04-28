console.log("Hello Week 8");

// const express = require("express");
// const app = express();

// const PORT = process.env.PORT || 4000;

// app.use(express.static("public"));
// app.use("/css", express.static(__dirname = "/public/css"));
// app.use("/js", express.static(__dirname = "/public/src"));

// app.listen(PORT, function() {
//     console.log("Server at http://localhost:%s", PORT);
// });


// const https = require('https');
// const fs = require('fs');
// const options = {
//   key: fs.readFileSync(__dirname + "/localhost-key.pem"),
//   cert: fs.readFileSync(__dirname + "/localhost.pem"),
// };
// https
//   .createServer(options, function (req, res) {
//     // server code
//   })
//   .listen(4000);

const express = require('express');
var fs = require('fs');
var https = require('https');
const app = express();

const httpPort = process.env.PORT || 4000;
const httpsPort = process.env.HTTPS_PORT || 4443;

app.use(express.static('public'));

app.listen(httpPort, () => {
  console.log('Server started at http://localhost:%s', httpPort);
});

https
  .createServer(
    {
      key: fs.readFileSync(__dirname + '/localhost-key.pem'),
      cert: fs.readFileSync(__dirname + '/localhost.pem'),
    },
    app
  )
  .listen(httpsPort, () => {
    console.log('Server started at http://localhost:%s', httpsPort);
  });