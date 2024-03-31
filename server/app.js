require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3001; // Use the PORT environment variable if set, otherwise use 3001
const admin_route = require("./routes/auth_routes/admin_route");
const app = express();
app.use(express.json());

app.use("/api/admin", admin_route);

mongoose
  .connect(`${process.env.URI}`)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.error(err));
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

