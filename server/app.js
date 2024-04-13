// app.js

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const logs = require("./middlewares/logs.js");

// Middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());
 // Place logs middleware here before any routes

// Routes
const adminRoute = require("./routes/auth_routes/admin_route");
const customerRoute = require("./routes/auth_routes/customer_route");
const routerProduct = require("./routes/product_routes.js");
const orderRoutes = require("./routes/order_routes.js");

app.use("/api/admin", adminRoute);
app.use("/api/customer", customerRoute);
app.use("/api/admin/product", routerProduct);
app.use("/api/customer/order", orderRoutes);

// Connect to MongoDB
mongoose.connect(process.env.URI)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => console.error(err));

const PORT = process.env.PORT ;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
