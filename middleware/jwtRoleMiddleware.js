const jwt = require("jsonwebtoken");
const { SECRET } = require("../config");

module.exports = function (authorizedRoles) {
  return function (req, res, next) {
    if (req.method === "OPTIONS") next();

    try {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) return res.status(403).send("User not authorized");

      let authorized = false;

      const { roles } = jwt.verify(token, SECRET);
      roles.forEach((role) => {
        if (authorizedRoles.includes(role)) authorized = true;
      });

      if (!authorized) return res.status(403).send("You have no access");

      next();
    } catch (error) {
      res.status(403).send("User not authorized");
    }
  };
};
