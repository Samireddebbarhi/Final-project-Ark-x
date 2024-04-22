const CustomerModel = require("../../models/CustomerModel");

//Get all customers

const getAllCustomers = async (req, res) => {
  try {
    const users = await CustomerModel.find();

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No customers found" });
    }

    res.status(200).json({ users });
  } catch (error) {
    console.error("Error fetching customers:", error);
    res.status(500).json({ error: "Failed to fetch customers" });
  }
};

// Get a single customer by ID
const getById = async (req, res) => {
  try {
    const user = await CustomerModel.findOne({ _id: req.params.id });
    if (!user) {
      return res.status(404).json({ message: "CustomerModel not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching customer by ID:", error);
    res
      .status(500)
      .json({ error: "Failed to fetch customer, please try again" });
  }
};
// Delete a customer by ID
const deleteById = async (req, res) => {
  try {
    const deletedCustomer = await CustomerModel.findByIdAndDelete({
      _id: req.params.id,
    });

    if (!deletedCustomer) {
      return res.status(404).json({ message: "CustomerModel not found" });
    }
    res
      .status(200)
      .json({ message: "CustomerModel deleted successfully", deletedCustomer });
  } catch (error) {
    console.error("Error deleting customer by ID:", error);
    res
      .status(500)
      .json({ error: "Failed to delete customer, please try again" });
  }
};
// update customer 
const updateById = async (req, res) => {
  try {
    const customerId = req.params.id;
    const updates = req.body; // Assuming request body contains updated fields

    // Check if the customer exists
    const existingCustomer = await CustomerModel.findById(customerId);
    if (!existingCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // Update the customer with the new information
    // Using { new: true } to return the updated document
    const updatedCustomer = await CustomerModel.findByIdAndUpdate(
      customerId,
      updates,
      { new: true }
    );

    // Check if the update was successful
    if (!updatedCustomer) {
      return res.status(500).json({ error: "Failed to update customer" });
    }

    res.status(200).json({ message: "Customer updated successfully", updatedCustomer });
  } catch (error) {
    console.error("Error updating customer by ID:", error);
    res.status(500).json({ error: "Failed to update customer, please try again" });
  }
};

module.exports = {
  getAllCustomers,
  getById,
  deleteById,
  updateById,
};
