require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookie = require("cookie-parser");
const cors = require("cors");
const PORT = process.env.PORT ; // Use the PORT environment variable if set, otherwise use 3001
const admin_route = require("./routes/auth_routes/admin_route");
const customer_route = require("./routes/auth_routes/customer_route");
const RouterProduct = require("./routes/product_routes");
const verifyJwtCustomer = require("./middlewares/verifyJwtCus");
const verifyJwtAdmin = require("./middlewares/verifyJwt");
// const logs = require("./middlewares/logs");
const errorHandler = require("./middlewares/errorHandling");
const route_order = require("./routes/Customer_routes/crud_order");


const app = express();
app.use(express.json());
app.use(cors());
app.use(cookie());

// app.use(logs());
// Routes
app.use("/api/admin", admin_route);
app.use("/api/customer", customer_route);
app.use("/api/customer/order", verifyJwtCustomer, route_order)
// app.use("/api/customer/product", verifyJwtCustomer, RouterProduct);
// app.use("/api/admin/product", verifyJwtAdmin, RouterProduct);

// app.use(errorHandler());

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