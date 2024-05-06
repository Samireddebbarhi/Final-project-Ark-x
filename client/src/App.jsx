import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
<<<<<<< HEAD
import MainLayout from "./admin/components/MainLayout";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import Dashboard from "./pages/Dashboard";
import AddCat from "./pages/AddCat";
import CategoryList from "./pages/CategoryList";
import Order from "./Order";
import Reviews from "./Reviews";

=======
import MainLyaout from "./admin/components/MainLyaout";
import Products from "./pages/Products";
import Dashborad from "./pages/Dashborad";
import AddCat from "./pages/AddCat";
import CategoryList from "./pages/CategoryList";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
>>>>>>> 49fff52aaa3d806557c0c0d3379b8a03ab7a7940
function App() {
  return (
    <Router>
      <Routes>
<<<<<<< HEAD
        <Route path="/" element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/list-product" element={<Products />} />
          <Route path="/add-category" element={<AddCat />} />
          <Route path="/list-category" element={<CategoryList />} />
          {/* Add routes for Order and Reviews components */}
          <Route path="/orders" element={<Order />} />
          <Route path="/reviews" element={<Reviews />} />
=======
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<MainLyaout />}>
            <Route path="/dashboard" element={<Dashborad />} />
            <Route path="/list-product" element={<Products />} />
            <Route path="/add-category" element={<AddCat />} />
            <Route path="/list-category" element={<CategoryList />} />
          </Route>
>>>>>>> 49fff52aaa3d806557c0c0d3379b8a03ab7a7940
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
