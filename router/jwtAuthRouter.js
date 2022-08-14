const { Router } = require("express");
const { check } = require("express-validator");

const jwtController = require("../controller/jwtController");

const authMiddleware = require("../middleware/jwtAuthMiddleware"); // visitors can't proceed without token in Authorization header or with invalid token (jwt.verify throws error);
const roleMiddleware = require("../middleware/jwtRoleMiddleware"); //only visitors with ADMIN role can proceed

const authRouter = new Router();

// authRouter.get("/users", authMiddleware, authController.getUsers);
authRouter.get("/users", roleMiddleware(["ADMIN"]), jwtController.getUsers);
authRouter.post(
  "/registration",
  [
    check("username", "Username length 4-10 symbols").notEmpty(),
    check("password", "Password length 4-10 symbols").isLength({
      min: 4,
      max: 10,
    }),
  ],
  jwtController.registration
);
authRouter.post("/login", jwtController.login);

module.exports = authRouter;
