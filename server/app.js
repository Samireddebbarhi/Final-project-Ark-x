require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

const PORT = 3001;

mongoose
  .connect(`${process.env.URI}`)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.error(err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
