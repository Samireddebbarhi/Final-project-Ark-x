<<<<<<< HEAD
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
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";

import Categorylist from "./pages/CategoryList";
import Login from "./pages/Login";
<<<<<<< HEAD
import ProtectedRoute from "./components/ProtectedRoute";
>>>>>>> 49fff52aaa3d806557c0c0d3379b8a03ab7a7940
=======
import ProtectedRoute from "./admin/components/ProtectedRoute";
import Customers from "./pages/Customers";
import ImageUpload from "./ImageUplaod";
import Admins from "./pages/Admins";
>>>>>>> 6226091131c60c2f9ff4afe1ad48997511ac607d
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
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/list-product" element={<Products />} />
            <Route path="/list-category" element={<Categorylist />} />
            <Route path="/admins" element={<Admins />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/upload" element={<ImageUpload />} />
            <Route path="/orders" element={<Orders />} />
          </Route>
>>>>>>> 49fff52aaa3d806557c0c0d3379b8a03ab7a7940
=======
import React from 'react'
import "./App.css"
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import MainLyaout from './admin/components/MainLyaout';
import Categorylist from './pages/Categorylist';
import Products from './pages/Products';


function App () {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLyaout />} >
        {/* <Route  path="/dashborad" element={<Dashborad/>} />
          <Route  path="/add-product" element={<AddProduct/>}/>
          <Route path="/list-product"  element={<Products/>}/>
          <Route path="/add-category"  element={<AddCat/>}/> */}
          <Route path="/list-category"  element={<Categorylist/>}/>
          <Route path="/product"  element={<Products/>}/>

>>>>>>> 84e9bf8410621722a931961e62aafb56ee0cbd24
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
