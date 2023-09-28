var express = require("express");
var endpoints = require("./endpoints");
var app = express();

for (var key in endpoints) {
  var endpoint = endpoints[key];
  if (endpoint.middleware) {
    app[endpoint.method](endpoint.url, endpoint.middleware, endpoint.handler);
  } else {
    app[endpoint.method](endpoint.url, endpoint.handler);
  }
}

module.exports = exports = app;
