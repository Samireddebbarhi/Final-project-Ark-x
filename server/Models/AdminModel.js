const mongoose = require("mongoose");

const SchemaAdmin = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
  },

  name: {
    type: String,
    required: [true, "please enter your name"],
    maxlength: [40, "Name should not exceed more than 30 char"],
    minlength: [4, "Name should be atleast 4 char"],
  },
  email: {
    type: String,
    required: [true, "please enter your email"],
    unique: true,
    validate: [validator.isEmail, "Please enter a valid email"],
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "please enter your password"],
    minlength: [8, "password should be atleast 8 char"],
    select: false,
  },
  avatar: {
    image: {
      type: mongoose.Types.ObjectId,
      ref: "Image",
    },
  },
  role: {
    type: String,
    default: "admin",
  },
});

const AdminModel = mongoose.model("Admins", SchemaAdmin);
module.exports = AdminModel;
