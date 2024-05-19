require("dotenv").config();
const jwt = require("jsonwebtoken");
const AdminModel = require("../../models/AdminModel.js");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "Missing fields" });
  }

  try {
    const admin = await AdminModel.findOne({ email });

    if (!admin || admin.password !== password) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const token = jwt.sign({ InfoAdmin: admin }, process.env.TOKEN_ADMIN, {
      expiresIn: "1h",
    });

    return res.status(200).json({
      Login_Success: true,
      token: token,
      admin: {
        name: admin.name,
        email: admin.email,
        username: admin.username,
        role: admin.role,
        permissions: admin.permissions,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server error");
  }
};
