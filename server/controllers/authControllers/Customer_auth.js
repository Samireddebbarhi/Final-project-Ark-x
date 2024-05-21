require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const CustomerModel = require("../../models/CustomerModel");

const customerRegister = async (req, res) => {
  try {
    const customer = req.body;
    if (!customer) {
      res.status(400).send("No data provided");
    } else {
      let hashedPassword = await bcrypt.hash(customer.password, 10); // Encryption of password using Bcrypt
      const newCustomer = new CustomerModel({
        ...customer,
        password: hashedPassword,
      });
      newCustomer.save().then(() => {
        res
          .status(200)
          .json({ Success_msg: `${customer.username} added successfully` });
      });
    }
  } catch (error) {
    // Handle any errors that occur during registration
    console.error("Error in customer registration:", error);
    res.status(500).send("Internal Server Error");
  }
};

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
          {
            InfoUser: customer,
          },
          process.env.TOKEN_CUSTOMER,
          {
            expiresIn: "20m",
          }
        );

        res.status(200).json({
          Login_Success: true,
          token: token,
          customer: {
            name: customer.name,
            email: customer.email,
            username: customer.username,
            role: customer.role,
            permissions: customer.permissions,
          },
        });
      });
    });
  } catch {
    console.log(err);
  }
};
// update customer Profile by Customer
const customer_update = async (req, res) => {
  try {
    const updated = await CustomerModel.updateOne(
      {
        username: req.body.name,
        email: req.body.email,
        password: req.body.password,
      },
      {
        new: true,
      }
    );

    if (!updated) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.status(200).json({ message: "Customer Updated successfully" });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: "Failed to update customer, please try again", err });
  }
};
// logout
const tokenBlacklist = new Set();

const customerLogout = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ msg: "Token is required" });
    }

    // Add the token to the blacklist
    tokenBlacklist.add(token);

    res.status(200).json({ msg: "Logged out successfully" });
  } catch (error) {
    console.error("Error logging out:", error);
    res.status(500).json({ msg: "Failed to logout" });
  }
};

module.exports = {
  customerRegister,
  customerLogin,
  customer_update,
  customerLogout,
};