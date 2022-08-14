module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") next();

  try {
    if (!req.session.authorized)
      return res.status(403).send("User not authorized");

    next();
  } catch (error) {
    res.status(403).send("User not authorized");
  }
};
