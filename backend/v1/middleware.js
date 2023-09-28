var ApiError = require("./classes/ApiError");
const jwt = require("jsonwebtoken");
var middleware = {};

// Middleware function to authenticate JWT token
middleware.authenticateJWT = function (req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  //TODO: add secret in env variable/config file
  jwt.verify(token, "my-secret", (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token" });
    }
    // If the token is valid, attach the decoded user to the request object for further use
    req.user = user;

    next();
  });
};

middleware.adminArea = function (req, res, next) {
  if (req.apiSession.is_admin) {
    next();
  } else {
    res.status(403).send({ message: "Access denied" });
  }
};

module.exports = middleware;
