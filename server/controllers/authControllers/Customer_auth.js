require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const CustomerModel = require("../../models/CustomerModel");
const sendEmail = require("../../utils/sendEmail");

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
            expiresIn: "1d",
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
    // console.log(err);
    res
      .status(500)
      .json({ error: "Failed to update customer, please try again", err });
  }
};
// logout

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
const forgotPassword = async (req, res, next) => {
  try {
    const user = await CustomerModel.findOne({ email: req.body.email });

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    const resetToken = jwt.sign({ id: user._id }, process.env.FORGOT_PASSWD, {
      expiresIn: "5m",
    });

    const expirationTime = new Date(
      Date.now() + 5 * 60 * 1000
    ).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

    const resetPasswordUrl = `http://localhost:5173/resetPassword/${user._id}/${resetToken}`;

    const message = `Your password reset token is:\n\n${resetPasswordUrl}\n\nThis link will expire at ${expirationTime}.\n\nIf you did not request this email, please ignore it.`;
    const htmlMessage = `
      <p>Your password reset token is:</p>
      <a href="${resetPasswordUrl}">${resetPasswordUrl}</a>
      <p>This link will expire at <strong>${expirationTime}</strong>.</p>
      <p>If you did not request this email, please ignore it.</p>
      
    `;

    await sendEmail({
      email: user.email,
      subject: "Ecommerce Password Recovery",
      message,
      html: htmlMessage,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    res.status(500);
    throw new Error(error.message);
  }
};
const resetPassword = async (req, res, next) => {
  const { userId, token } = req.params;

  const { password } = req.body;

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.FORGOT_PASSWD);

    // Check if the user ID in the token matches the request
    if (decoded.id !== userId) {
      res.status(400);
      throw new Error("Invalid or expired token");
    }

    const user = await CustomerModel.findById(userId);

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    user.password = await bcrypt.hash(password, 10);

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successfuly",
    });
  } catch (error) {
    res.status(500);
    next(error);
  }
};

module.exports = {
  customerRegister,
  customerLogin,
  customer_update,
  customerLogout,
  resetPassword,
  forgotPassword,
};
