module.exports = function (authorizedRoles) {
  return function (req, res, next) {
    if (req.method === "OPTIONS") next();

    try {
      if (!req.session.authorized)
        return res.status(403).send("User not authorized");

      let hasAccess = false;

      const roles = req.session.roles;
      roles.forEach((role) => {
        if (authorizedRoles.includes(role)) hasAccess = true;
      });

      if (!hasAccess) return res.status(403).send("You have no access");

      next();
    } catch (error) {
      res.status(403).send("User not authorized");
    }
  };
};
