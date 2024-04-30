const packModel = require('../Models/PackModel');
const express = require("express");
const app = express();
app.use(express.json());

const addPack = async (req, res) => {
  try {
    const pack = new packModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      features: req.body.features,
      validityDays: req.body.validityDays,
    });

    await pack.save();
    console.log("Pack added successfully");
    res.status(200).send("Pack added successfully");
    
  } catch (err) {
    console.log(err);
    res.status(500).send("Failed to add pack");
  }
};

const getPack = async (req, res) => {
  try {
    const packId = req.params.id;
    const pack = await packModel.findById(packId);
    if (!pack) {
      res.status(404).send("Pack not found");
    } else {
      res.json(pack);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Failed to retrieve pack");
  }
};

const updatePack = async (req, res) => {
  try {
    const packId = req.params.id;
    const pack = req.body;
    const updatedPack = await packModel.findByIdAndUpdate(packId, pack, { new: true });
    if (!updatedPack) {
      res.status(404).send("Pack not found");
    } else {
      res.json(updatedPack);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Failed to update pack");
  }
};

const deletePack = async (req, res) => {
  try {
    const packId = req.params.id;
    const deletedPack = await packModel.findByIdAndDelete(packId);
    if (!deletedPack) {
      res.status(404).send("Pack not found");
    } else {
      res.json(deletedPack);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Failed to delete pack");
  }
};

module.exports = { addPack, getPack, updatePack, deletePack };
