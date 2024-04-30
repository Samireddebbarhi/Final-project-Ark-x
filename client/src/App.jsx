import React from 'react'
import "./App.css"
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import MainLyaout from './admin/components/MainLyaout';
import Products from './pages/Products';

function App () {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLyaout />} />
        
      </Routes>
    </Router>
  )
}

export default App
