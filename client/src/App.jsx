import React from 'react'
import "./App.css"
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import MainLyaout from './admin/components/MainLyaout';
import Products from './pages/Products';
import Dashborad from './pages/Dashborad';
import AddCat from './pages/AddCat';
import Categorylist from './pages/Categorylist';
import Customers from './pages/Customers';
function App () {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLyaout />} >
        <Route  path="/dashborad" element={<Dashborad/>} />
          <Route path="/list-product"  element={<Products/>}/>
          <Route path="/add-category"  element={<AddCat/>}/>
          <Route path="/list-category"  element={<Categorylist/>}/>
          <Route path="/customers"  element={<Customers/>}/>
          

        </Route>
      </Routes>
    </Router>
  )
}

export default App
