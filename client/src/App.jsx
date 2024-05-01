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

        </Route>
      </Routes>
    </Router>
  )
}

export default App
