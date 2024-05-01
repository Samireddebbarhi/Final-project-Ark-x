import React from 'react'
import "./App.css"
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import MainLyaout from './admin/components/MainLyaout';
import Products from './pages/Products';
import AddProduct from './pages/AddProduct';
import Dashborad from './pages/Dashborad';
import AddCat from './pages/AddCat';
import CategoryList from './pages/CategoryList';
function App () {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLyaout />} >
        <Route  path="/dashborad" element={<Dashborad/>} />
          <Route  path="/add-product" element={<AddProduct/>}/>
          <Route path="/list-product"  element={<Products/>}/>
          <Route path="/add-category"  element={<AddCat/>}/>
          <Route path="/list-category"  element={<CategoryList/>}/>

        </Route>
      </Routes>
    </Router>
  )
}

export default App
