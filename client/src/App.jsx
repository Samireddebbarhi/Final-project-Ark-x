import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLyaout from "./admin/components/MainLyaout";
import Products from "./pages/Products";
import Dashborad from "./pages/Dashborad";

import Categorylist from "./pages/CategoryList";
import Login from "./pages/Login";
import ProtectedRoute from "./admin/components/ProtectedRoute";
import Customers from "./pages/Customers";
import ImageUpload from "./ImageUplaod";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<MainLyaout />}>
            <Route path="/dashboard" element={<Dashborad />} />
            <Route path="/list-product" element={<Products />} />
            <Route path="/list-category" element={<Categorylist />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/upload" element={<ImageUpload />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

{
  /* <Route  path="/dashborad" element={<Dashborad/>} />
          <Route path="/list-product"  element={<Products/>}/>
          <Route path="/add-category"  element={<AddCat/>}/>
          <Route path="/list-category"  element={<Categorylist/>}/>
          <Route path="/customers"  element={<Customers/>}/>
          

        </Route>
      </Routes> */
}
