const User = require("../model/user");
const Role = require("../model/role");
const bcrypt = require("bcryptjs");

const { validationResult } = require("express-validator");

class sessionController {
  async registration(req, res) {
    try {
      const errors = validationResult(req); //errors by express-validator;
      if (!errors.isEmpty())
        return res.status(400).json({ message: "validation error", errors });

      const { username, password } = req.body;
      const userExists = await User.findOne({ username });
      if (userExists) {
        return res.status(400).send("User already exists");
      }

      const pwHash = bcrypt.hashSync(password, 5); //generate password hash to store in DB;
      const userRole = await Role.findOne({ value: "USER" });
      await User.create({
        username,
        password: pwHash,
        roles: [userRole.value],
      });
      return res.send("Success registration");
    } catch (error) {
      res.status(500).send("Registration error");
    }
  }

  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) return res.status(400).send("User not found");

      const isPassValid = bcrypt.compareSync(password, user.password);
      if (!isPassValid) return res.status(400).send("Wrong password");

      req.session.authorized = true;
      req.session.roles = user.roles;
      return res.send("Success authentication");
    } catch (error) {
      res.status(500).send("Login error");
    }
  }

  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).send("DB error");
    }
  }
}

module.exports = new sessionController();
