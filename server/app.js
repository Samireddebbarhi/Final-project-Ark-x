require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
<<<<<<< HEAD
<<<<<<< HEAD
const path = require("path");
=======
// HEAD
const packRouter = require("./routes/pack_route");
const categoryRouter = require("./routes/category_route");

>>>>>>> 918275d63eace52fee2029bd92b40557419f189f
=======
const path = require("path");
>>>>>>> 84e9bf8410621722a931961e62aafb56ee0cbd24
const cookie = require("cookie-parser");
const cors = require("cors");
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
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());

app.use(cookie());
app.use(express.static("client"));
app.use(logs);
// Routes
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> c93456289441c7f9db61ed7010ac24afe484aab8
=======
>>>>>>> 84e9bf8410621722a931961e62aafb56ee0cbd24
app.use("/api/v1/admin/super", admin_route.authRoute);
app.use("/api/v2/admin/super", verifyJwtAdmin, admin_route.adminRouter);
app.use("/api/v2/admin/super", verifyJwtAdmin, customer_crud);
app.use("/api/v2/customer", verifyJwtCustomer, customer_crud);

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
app.use("/api/v2/admin", verifyJwtAdmin, catg_route);
=======
app.use("/api/v2/admin", /*verifyJwtAdmin,*/ catg_route);
>>>>>>> 49fff52aaa3d806557c0c0d3379b8a03ab7a7940
=======
app.use("/api/v2/admin", verifyJwtAdmin, catg_route);
>>>>>>> 6226091131c60c2f9ff4afe1ad48997511ac607d
app.use("/api/v2/admin", verifyJwtAdmin, RouterProduct);
app.use("/api/v2/admin", verifyJwtAdmin, review_route);

<<<<<<< HEAD
=======
>>>>>>> c93456289441c7f9db61ed7010ac24afe484aab8
=======
>>>>>>> 49fff52aaa3d806557c0c0d3379b8a03ab7a7940
app.use("/api/v2/customer", verifyJwtCustomer, catg_route);
=======
app.use("/api/v2/admin", catg_route);
app.use("/api/v2/admin", RouterProduct);
app.use("/api/v2/admin", verifyJwtAdmin, review_route);

app.use("/api/v2/customer", /*verifyJwtCustomer,*/ catg_route);
>>>>>>> 84e9bf8410621722a931961e62aafb56ee0cbd24
app.use("/api/v2/customer", verifyJwtCustomer, review_route);
app.use("/api/v1/customer", customer_route);
app.use("/api/customer/card", Cardt);
app.use("/api/customer/card", Cardt);

app.use("/api/orders/", PayRoute);
app.get("/", (req, res) => {
  res.sendFile(path.resolve("./client/checkout.html"));
});
<<<<<<< HEAD
=======
app.use("/api/admin", admin_route);
app.use("/api/customer", customer_route);
// HEAD
app.use("/api/pack", packRouter);
app.use("/api/category", categoryRouter);

app.use("/api/customer/product", verifyJwtCustomer, RouterProduct);
app.use("/api/admin/product", verifyJwtAdmin, RouterProduct);
>>>>>>> 918275d63eace52fee2029bd92b40557419f189f
=======
>>>>>>> 84e9bf8410621722a931961e62aafb56ee0cbd24
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