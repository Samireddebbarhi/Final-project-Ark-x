require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
<<<<<<< HEAD
const path = require("path");
=======
// HEAD
const packRouter = require("./routes/pack_route");
const categoryRouter = require("./routes/category_route");

>>>>>>> 918275d63eace52fee2029bd92b40557419f189f
const cookie = require("cookie-parser");
const cors = require("cors");
// e4ebd8e905e4957ceeec146e9e4f44a8b0375ba7
const PORT = process.env.PORT || 3001; // Use the PORT environment variable if set, otherwise use 3001
const admin_route = require("./routes/auth_routes/admin_route");
const customer_route = require("./routes/auth_routes/customer_route");
const RouterProduct = require("./routes/product_routes");
const customer_crud = require("./routes/Customer_routes/crud_routes");
const Cardt = require("./routes/cart_routes");
const catg_route = require("./routes/category_route");
const review_route = require("./routes/Customer_routes/review_routes");
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
<<<<<<< HEAD
app.use("/api/v1/admin/super", admin_route.authRoute);
app.use("/api/v2/admin/super", verifyJwtAdmin, admin_route.adminRouter);
app.use("/api/v2/admin/super", verifyJwtAdmin, customer_crud);
app.use("/api/v2/customer", verifyJwtCustomer, customer_crud);

app.use("/api/v2/admin", verifyJwtAdmin, catg_route);
app.use("/api/v2/admin", verifyJwtAdmin, RouterProduct);
app.use("/api/v2/admin", verifyJwtAdmin, review_route);

app.use("/api/v2/customer", verifyJwtCustomer, catg_route);
app.use("/api/v2/customer", verifyJwtCustomer, review_route);
app.use("/api/v1/customer", customer_route);
app.use("/api/customer/card", Cardt);
app.use("/api/customer/card", Cardt);

app.use("/api/orders/", PayRoute);
app.get("/", (req, res) => {
  res.sendFile(path.resolve("./client/checkout.html"));
});
=======
app.use("/api/admin", admin_route);
app.use("/api/customer", customer_route);
// HEAD
app.use("/api/pack", packRouter);
app.use("/api/category", categoryRouter);

app.use("/api/customer/product", verifyJwtCustomer, RouterProduct);
app.use("/api/admin/product", verifyJwtAdmin, RouterProduct);
>>>>>>> 918275d63eace52fee2029bd92b40557419f189f
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
