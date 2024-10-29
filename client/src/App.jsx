import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./admin/components/MainLayout";
import Products from "./pages/Products";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import CategoryList from "./pages/CategoryList";
import Login from "./pages/Login";
import ProtectedRoute from "./admin/components/ProtectedRoute";
import Customers from "./pages/Customers";
import ImageUpload from "./ImageUpload";
import Admins from "./pages/Admins";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/list-product" element={<Products />} />
            <Route path="/list-category" element={<CategoryList />} />
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

export default App;
