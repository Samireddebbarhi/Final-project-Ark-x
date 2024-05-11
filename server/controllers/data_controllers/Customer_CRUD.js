const CustomerModel = require("../../models/CustomerModel");
const mongoose = require('mongoose');

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
    // Check if req.params.id is a valid ObjectId
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid customer ID" });
    }

    const deletedCustomer = await CustomerModel.deleteOne({
      _id: req.params.id,
    });

    if (!deletedCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res
      .status(200)
      .json({ message: "Customer deleted successfully", deletedCustomer });
  } catch (error) {
    console.error("Error deleting customer by ID:", error);
    res
      .status(500)
      .json({ error: "Failed to delete customer, please try again" });
  }
};
// const updateById= async (req, res) => {
//   try{
//     const res =await  CustomerModel.findById({_id : req.params.id},{$set:{
//       name : req.body.name ,
//       email : req.body.email,
//       password : req.body.password,
//       address : req.body.address
//     }});
   

//     }

    
//     // If no changes were made, send back original data
//     if(!res) {
//         return res.status(400).json({success:"False",err_msg:"no customer with this id found "});

//     }
//     const updated=
    



//   }catch(err){
//     console.log('update err', err)
//   }
 


module.exports = {
  getAllCustomers,
  getById,
  deleteById,
  
};
