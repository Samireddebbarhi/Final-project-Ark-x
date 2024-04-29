const bcrypt = require("bcrypt");
const AdminModel = require("../../models/AdminModel.js");

exports.createAdmin = async (req, res) => {
  try {
    const admin = req.body;
    if (!admin) {
      res.status(400).send("No data provided");
    } else {
      let hashedPassword = await bcrypt.hash(admin.password, 10); //Encryption of password using  Bcrypt
      const newAdmin = new AdminModel({
        ...admin,
        password: hashedPassword,
      });

      newAdmin
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
};
// Controller to get admin by ID
exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await AdminModel.find();
    if (!admins) {
      throw new Error("No Adminstrateur Found");
    }
    res.status(200).json({ success: "true", data: admins });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};

exports.getAdminById = async (req, res) => {
  try {
    const admin = await AdminModel.findById(req.params.id);
    if (!admin) {
      return res
        .status(404)
        .json({ success: false, message: "Admin not found by this id " });
    }
    res.status(200).json({
      success: "True",
      data: {
        admin,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

// Controller to update admin by ID
exports.updateAdmin = async (req, res) => {
  try {
    const admin = await AdminModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      success: "True",
      data: {
        admin,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

// Controller to delete admin by ID
exports.deleteAdmin = async (req, res) => {
  try {
    const deleted = await AdminModel.deleteOne({ _id: req.params.id });

    if (!deleted) {
      return res.status(404).json({
        success: "False",
        message: "Admin not found!",
      });
    }
    res.status(200).json({
      success: "True",
      Deleted_data: deleted,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

// Controller to grant permissions to a manager
exports.grantPermissions = async (req, res) => {
  try {
    const admin = await AdminModel.findById(req.params.id);
    if (!admin) {
      return res.status(404).json({
        success: "False",
        message: "Admin not found",
      });
    }

    // Check if the current user is a super admin
    if (req.user.role !== "super_admin") {
      return res.status(403).json({
        status: "error",
        message: "Permission denied. Only super admins can grant permissions.",
      });
    }

    // Update permissions for the admin
    admin.permissions = req.body.permissions;
    await admin.save();

    res.status(200).json({
      status: "success",
      data: {
        admin,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};
