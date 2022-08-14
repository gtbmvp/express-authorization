const { Router } = require("express");
const { check } = require("express-validator");

const sessionController = require("../controller/sessionController");

const authMiddleware = require("../middleware/sessionAuthMiddleware"); // visitors can't proceed without req.session.authorized == true;
const roleMiddleware = require("../middleware/sessionRoleMiddleware"); //only visitors with ADMIN role in req.session.roles can proceed

const authRouter = new Router();

// authRouter.get("/users", authMiddleware, sessionController.getUsers);
authRouter.get("/users", roleMiddleware(["ADMIN"]), sessionController.getUsers);
authRouter.post(
  "/registration",
  [
    check("username", "Username length 4-10 symbols").notEmpty(),
    check("password", "Password length 4-10 symbols").isLength({
      min: 4,
      max: 10,
    }),
  ],
  sessionController.registration
);
authRouter.post("/login", sessionController.login);

module.exports = authRouter;
