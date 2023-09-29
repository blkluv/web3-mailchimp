var endpoints = {};
var userHandler = require("./handlers/userHandler");
var scheduleHandler = require("./handlers/scheduleHandler");

var middleware = require("./middleware");

endpoints.createUser = {
  url: "/v1/user",
  method: "post",
  middleware: [],
  handler: userHandler.create,
  description: "create user",
};
endpoints.readUser = {
  url: "/v1/user/:id",
  method: "get",
  middleware: [],
  handler: userHandler.read,
  description: "create user",
};

endpoints.loginUser = {
  url: "/v1/user/login/:serviceprovider_name",
  method: "get",
  middleware: [],
  handler: userHandler.loginUser,
  description: "login user",
};

endpoints.updateUser = {
  url: "/v1/user/:id",
  method: "put",
  middleware: [],
  handler: userHandler.update,
  description: "update user",
};

endpoints.deleteUser = {
  url: "/v1/user/:id",
  method: "delete",
  middleware: [],
  handler: userHandler.delete,
  description: "delete user",
};
/*  */
//Schedule endpoints
/*  */

endpoints.scheduleTask = {
  url: "/v1/schedule",
  method: "get",
  middleware: [],
  handler: scheduleHandler.read,
  description: "schedule a task",
};
module.exports = endpoints;
