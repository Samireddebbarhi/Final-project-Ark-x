const mongoose = require("mongoose");
const validator = require("validator");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const SchemaCustomer = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
    },

    name: {
      type: String,
      required: [true, "please enter your name"],
      maxlength: [25, "Name should not exceed more than 30 char"],
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
    },
    avatar: {
      image: {
        type: mongoose.Types.ObjectId,
        ref: "Image",
      },
    },
    role: {
      type: String,
      default: "user",
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpire: {
      type: Date,
    },
    permissions: {
      type: [String],
      default: ["create", "read", "update", "delete"],
    },
  },
  {
    timestamps: true,
  }
);
SchemaCustomer.methods.getResetPasswordToken = function () {
  //generation token
  const resetToken = crypto.randomBytes(20).toString("hex");
  //hashing and add to userschema

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

SchemaCustomer.methods.comparePassword = async function (enteredpassword) {
  return await bcrypt.compare(enteredpassword, this.password);
};

// HEAD
const  CustomerModel = mongoose.model("Customer", SchemaCustomer);

//const CustomerModel = mongoose.model("Customer", SchemaCustomer);
//e4ebd8e905e4957ceeec146e9e4f44a8b0375ba7
module.exports = CustomerModel;
