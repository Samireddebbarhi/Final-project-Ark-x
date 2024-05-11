import React from 'react'
import "./App.css"
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import MainLyaout from './admin/components/MainLyaout';
import Products from './pages/Products';


import Categorylist from './pages/Categorylist';
import Login from './pages/Login';
import ProtectedRoute from './admin/components/ProtectedRoute';
import Customers from './pages/Customers';
import Orders from './pages/Orders'
import Admins from './pages/Admins';
import Dashboard from './pages/Dashborad';
function App () {
  
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute/>}>
          <Route path="/" element={<MainLyaout />}>
            <Route path="/dashborad" element={<Dashboard/>} />
            <Route path="/list-product" element={<Products />} />
            <Route path="/list-category" element={<Categorylist />} />
            <Route path="/admins" element={<Admins />} />
            <Route path="/customers" element={<Customers/>} />
            <Route path="/orders" element={<Orders />} />
          
          </Route>
          </Route>

        
      </Routes>
    </Router>
  )
}

export default App

