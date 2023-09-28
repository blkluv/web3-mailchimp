var express = require("express");
var app = express();
var v1 = require("./v1/");
var bodyParser = require("body-parser");
var cors = require("cors");

var { expressjwt: jwt } = require("express-jwt");
const { addConnectionListener } = require("./v1/services/WebsocketService");

//TODO: store better secret in hidden config file
const secret = process.env.JWT_SECRET || "my-secret";

var appPort = process.env.PORT || 3000;

app.use(
  cors(),
  bodyParser.json({ limit: "5mb" }),
  /* jwt({
    secret: secret,
    algorithms: ["HS256"],
  }).unless({ path: ["/v1/user", "/v1/user/login"], method: ["POST", "GET"] }), */ // Exclude '/v1/user' and '/v1/user/login' paths from JWT authentication
  v1
);

// requires access to lower ports
console.log(
  "\n\nIF THIS THROWS AN ERROR -\nMAKE SURE YOU ARE ALLOWED TO OPEN PORT 3000!\n\n"
);
const server = app.listen(appPort);
addConnectionListener(server);
