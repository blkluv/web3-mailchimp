"use strict";

var Schedule = require("../classes/Schedule");
var ApiError = require("../classes/ApiError");
const jwt = require("jsonwebtoken");

var scheduleHandler = {};

//Add JWT token for session management

scheduleHandler.read = function (req, res) {
  console.log(req.body, "wats req and body?");
  var schedule = new Schedule();
  schedule.read().then(
    (user) => {
      res.status(200).send(user);
    },
    (reason) => {
      res.status(400).send(new ApiError(400, reason));
    }
  );
};

module.exports = scheduleHandler;
