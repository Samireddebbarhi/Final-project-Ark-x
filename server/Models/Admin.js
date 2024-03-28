const mongoose = require("mongoose");

const SchemaAdmin = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  permission: {
    type: String,
    default: "admin",
  },
});

export default AdminModel = mongoose.model("Admin", SchemaAdmin);
