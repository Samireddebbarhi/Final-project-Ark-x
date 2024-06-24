const mongoose = require("mongoose");
const validator = require("validator");

const SchemaAdmin = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
  },
  name: {
    type: String,
    required: [true, "Please enter your name"],
    maxlength: [40, "Name should not exceed more than 30 characters"],
    minlength: [4, "Name should be at least 4 characters"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    validate: [validator.isEmail, "Please enter a valid email"],
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minlength: [8, "Password should be at least 8 characters"],
  },
  avatar: {
    image: {
      type: mongoose.Types.ObjectId,
      ref: "Image",
    },
  },
  role: {
    type: String,
    enum: ["admin", "super_admin"],
    default: "admin",
  },
  permissions: [
    {
      type: String,
      enum: ["create", "read", "update", "delete"],
    },
  ],
});

const AdminModel = mongoose.model("Admins", SchemaAdmin);
module.exports = AdminModel;
