const packModel = require('../models/Pack');
const express = require("express");
const app = express();
app.use(express.json());

const addPack = (req, res) => {
  const pack = new packModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    features: req.body.features,
  });

  pack.save((err) => {
    if (err) {
      console.log(err);
      res.status(500).send("Failed to add pack");
    } else {
      console.log("Pack added successfully");
      res.send("Pack added successfully");
    }
  });
}

const getPack = (req, res) => {
  const packId = req.params.id; 

  packModel.findById(packId, (err, pack) => {
    if (err) {
      console.log(err);
      res.status(500).send("Failed to retrieve pack"); 
    } else {
      if (!pack) {
        res.status(404).send("Pack not found"); 
      } else {
        res.json(pack); 
      }
    }
  });
};

const updatePack = (res,req) => {
  const packId = req.params.id; 
  const pack = req.body;
  packModel.findByIdAndUpdate(packId, pack, (err, pack) => {
    if (err) {
      console.log(err);
      res.status(500).send("Failed to update pack"); 
    } else {
      if (!pack) {
        res.status(404).send("Pack not found"); 
      } else {
        res.json(pack); 
      }
    }
  });
}

const deletePack = (req, res) => {
  const packId = req.params.id; 
  packModel.findByIdAndDelete(packId, (err, pack) => {
    if (err) {
      console.log(err);
      res.status(500).send("Failed to delete pack"); 
    } else {
      if (!pack) {
        res.status(404).send("Pack not found"); 
      } else {
        res.json(pack); 
      }
    }
  });
}

module.exports = {addPack, getPack, updatePack, deletePack}

