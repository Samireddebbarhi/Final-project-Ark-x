require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
// HEAD
const packRouter = require("./routes/pack_route");
const categoryRouter = require("./routes/category_route");

const cookie = require("cookie-parser");
const cors = require("cors");
// e4ebd8e905e4957ceeec146e9e4f44a8b0375ba7
const PORT = process.env.PORT || 3001; // Use the PORT environment variable if set, otherwise use 3001
const admin_route = require("./routes/auth_routes/admin_route");
const customer_route = require("./routes/auth_routes/customer_route");
const RouterProduct = require("./routes/product_routes");
const verifyJwtCustomer = require("./middlewares/verifyJwtCus");
const verifyJwtAdmin = require("./middlewares/verifyJwt");
const logs = require("./middlewares/logs");
const errorHandler = require("./middlewares/errorHandling");
const app = express();
app.use(express.json());
app.use(cors());
app.use(cookie());

app.use(logs);
// Routes
app.use("/api/admin", admin_route);
app.use("/api/customer", customer_route);
// HEAD
app.use("/api/pack", packRouter);
app.use("/api/category", categoryRouter);

app.use("/api/customer/product", verifyJwtCustomer, RouterProduct);
app.use("/api/admin/product", verifyJwtAdmin, RouterProduct);
app.use(errorHandler);
// e4ebd8e905e4957ceeec146e9e4f44a8b0375ba7

// Connect to MongoDB database using Mongoose
mongoose
  .connect(`${process.env.URI}`)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.error(err));
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
