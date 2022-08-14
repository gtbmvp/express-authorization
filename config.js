module.exports = {
  PORT: process.env.PORT || 5010,
  SECRET: "xr11p",
  DB_URL: "mongodb://localhost:27017/express-authorization",
  SESSION_LIFETIME: 1000 * 60 * 60 * 5, //5 hours
};
