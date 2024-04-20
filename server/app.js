require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cookie = require("cookie-parser");
const cors = require("cors");
const PORT = process.env.PORT || 3001; // Use the PORT environment variable if set, otherwise use 3001
const admin_route = require("./routes/auth_routes/admin_route");
const customer_route = require("./routes/auth_routes/customer_route");
const RouterProduct = require("./routes/product_routes");
const Cardt = require("./routes/cart_routes")
const PayRoute = require("./routes/payment_routes");
const verifyJwtCustomer = require("./middlewares/verifyJwtCus");
const verifyJwtAdmin = require("./middlewares/verifyJwt");
const logs = require("./middlewares/logs");
const errorHandler = require("./middlewares/errorHandling");
const app = express();
app.use(express.json());
app.use(cors());
app.use(cookie());
app.use(express.static("client"));
app.use(logs);
// Routes
app.use("/api/admin", admin_route);
app.use("/api/customer", customer_route);
app.use("/api/customer/card", Cardt)
app.use("/api/customer/product", verifyJwtCustomer, RouterProduct);
app.use("/api/admin/product",  RouterProduct);
app.use("/api/orders/", PayRoute);
app.get("/", (req, res) => {
  res.sendFile(path.resolve("./client/checkout.html"));
});
app.use(errorHandler);

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
