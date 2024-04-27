
import React from 'react';
import './App.css';
import Navbar from './admin/components/sidebar/Navbar';
import { BrowserRouter as Router, Navigate, Route } from 'react-router-dom';
import Home from './pages/Home';
import Reports from './pages/Report';
import Products from './pages/Products';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Navigate>
          <Route path='/' exact component={Home} />
          <Route path='/reports' component={Reports} />
          <Route path='/products' component={Products} />
        </Navigate>
      </Router>
    </>
  );
}

export default App;
