require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AdminModel = require("../../models/AdminModel.js");

/*exports.register = async (req, res) => {
  try {
    const admin = req.body;
    if (!admin) {
      res.status(400).send("No data provided");
    } else {
      let hashedPassword = await bcrypt.hash(admin.password, 10); //Encryption of password using  Bcrypt
      const newAdmin = new AdminModel({
        ...admin,
        password: hashedPassword,
      })
        .save()
        .then(() =>
          res
            .status(200)
            .json({ Succefull_msg: `${admin.username} added Succefully` })
        );
    }
  } catch (err) {
    console.log(err);
  }
};*/

exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password){
    return res.status(400).json({ msg: "Missing fields" });
  }else {
    console.log("email and password data", email , password)
  }
    
  AdminModel.findOne({ email }).then(async (admin) => {
    if (!admin) return res.status(400).json({ msg: "Invalid credentials" });

    await bcrypt.compare(password, admin.password).then((isMatch) => {
      if (!isMatch)
        return res.status(400).json({ msg: "error password, Try again !!" });

      const token = jwt.sign({ InfoAdmin: admin }, process.env.TOKEN_ADMIN, {
        expiresIn: "20m",
      });

      res
        .status(200)
        .send(`${admin.username} logged in with a token: ${token}`);
    });
  });
};
