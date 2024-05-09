<<<<<<< HEAD
import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLyaout from "./admin/components/MainLyaout";
import Products from "./pages/Products";
import Dashborad from "./pages/Dashborad";
import AddCat from "./pages/AddCat";
import CategoryList from "./pages/CategoryList";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
function App() {
=======
import React from 'react'
import "./App.css"
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import MainLyaout from './admin/components/MainLyaout';
import Products from './pages/Products';
import Dashborad from './pages/Dashborad';

import Categorylist from './pages/Categorylist';
import Login from './pages/Login';
import ProtectedRoute from './admin/components/ProtectedRoute';
import Customers from './pages/Customers';
import ImageUpload from './ImageUplaod';
function App () {
  
>>>>>>> a85132681e307261995b03843ce68c4ca45f8b70
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
<<<<<<< HEAD
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<MainLyaout />}>
            <Route path="/dashboard" element={<Dashborad />} />
            <Route path="/list-product" element={<Products />} />
            <Route path="/add-category" element={<AddCat />} />
            <Route path="/list-category" element={<CategoryList />} />
          </Route>
        </Route>
=======
          <Route element={<ProtectedRoute/>}>
          <Route path="/" element={<MainLyaout />}>
            <Route path="/dashboard" element={<Dashborad />} />
            <Route path="/list-product" element={<Products />} />
            <Route path="/list-category" element={<Categorylist />} />
            <Route path="/customers" element={<Customers/>} />
            <Route path="/upload" element={<ImageUpload />}/>
          </Route>
          </Route>

        
>>>>>>> a85132681e307261995b03843ce68c4ca45f8b70
      </Routes>
    </Router>
  );
}

<<<<<<< HEAD
export default App;
=======
export default App

{/* <Route  path="/dashborad" element={<Dashborad/>} />
          <Route path="/list-product"  element={<Products/>}/>
          <Route path="/add-category"  element={<AddCat/>}/>
          <Route path="/list-category"  element={<Categorylist/>}/>
          <Route path="/customers"  element={<Customers/>}/>
          

        </Route>
      </Routes> */}
>>>>>>> a85132681e307261995b03843ce68c4ca45f8b70
