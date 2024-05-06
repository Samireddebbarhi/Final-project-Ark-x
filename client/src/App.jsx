import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./admin/components/MainLayout";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import Dashboard from "./pages/Dashboard";
import AddCat from "./pages/AddCat";
import CategoryList from "./pages/CategoryList";
import Order from "./Order";
import Reviews from "./Reviews";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/list-product" element={<Products />} />
          <Route path="/add-category" element={<AddCat />} />
          <Route path="/list-category" element={<CategoryList />} />
          {/* Add routes for Order and Reviews components */}
          <Route path="/orders" element={<Order />} />
          <Route path="/reviews" element={<Reviews />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
