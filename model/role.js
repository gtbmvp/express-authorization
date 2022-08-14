const mongoose = require("mongoose");

const RoleSchema = mongoose.Schema({
  value: { type: String, unique: true, default: "USER" },
});

module.exports = mongoose.model("Role", RoleSchema);
