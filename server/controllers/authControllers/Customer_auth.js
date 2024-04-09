require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const CustomerModel = require("../../models/CustomerModel.js");

const customerRegister = async (req, res) => {
  try {
    const customer = req.body;
    if (!customer) {
      res.status(400).send("No data provided");
    } else {
      let hashedPassword = await bcrypt.hash(customer.password, 10); //Encryption of password using Bcrypt
      const newCustomer = new CustomerModel({
        name: customer.name,
        email: customer.email,
        dateOfBirth: customer.dateOfBirth,
        username: customer.username,
        password: hashedPassword,
      });
      newCustomer.save().then(() => {
        res
          .status(200)
          .json({ Success_msg: `${customer.username} added successfully` });
      });
    }
  } catch (err) {
    console.log(err);
  }
};
//
const customerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "Missing fields" });
    }
    CustomerModel.findOne({ email }).then(async (customer) => {
      if (!customer) return res.status(400).json({ msg: "Invalid Data" });

      await bcrypt.compare(password, customer.password).then((isMatch) => {
        if (!isMatch) {
          return res.status(400).json({ msg: "Password invalid, Try again" });
        }
        const token = jwt.sign(
          { CustomerId: customer._id },
          process.env.TOKEN_SECRET,
          {
            expiresIn: "20m",
          }
        );

        res
          .status(200)
          .send(`${customer.username} logged in with a token: ${token}`);
      });
    });
  } catch {
    console.log(err);
  }
};
module.exports = {
  customerRegister,
  customerLogin,
};
