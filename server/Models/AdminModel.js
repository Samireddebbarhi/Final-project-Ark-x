const mongoose = require("mongoose");

const SchemaAdmin = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  createdAt: { type: Date, default: Date.now() },

  permission: {
    type: String,
    default: "admin",
  },
});

const AdminModel = mongoose.model("Admins", SchemaAdmin);
module.exports = AdminModel;
