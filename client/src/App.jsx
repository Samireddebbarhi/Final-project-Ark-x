import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLyaout from "./admin/components/MainLyaout";
import Products from "./pages/Products";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";

import Categorylist from "./pages/ListCategory";
import Login from "./pages/Login";
import ProtectedRoute from "./admin/components/ProtectedRoute";
import Customers from "./pages/Customers";
import ImageUpload from "./ImageUplaod";
import Admins from "./pages/Admins";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<MainLyaout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/list-product" element={<Products />} />
            <Route path="/list-category" element={<Categorylist />} />
            <Route path="/admins" element={<Admins />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/upload" element={<ImageUpload />} />
            <Route path="/orders" element={<Orders />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}
<<<<<<< HEAD
export default App;
=======

export default App;


>>>>>>> a7fa1cf22d1605af6d30e711dbef0ea8791ebf09
