import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/register"; 
import Home from "./pages/Home/Home";
import Mobiles from "./pages/products/Mobiles";
import Laptops from "./pages/products/Laptops";
import Entertainment from "./pages/products/Entertainment";
import HomePage from "./pages/Home/Home";
import About from "./pages/Home/About";
import Favourites from "./pages/Favourites";
import Cart from "./pages/Cart";



const App = () => {
  return (
    <>
    <Router>
      <Routes>
         <Route path="/" element={<Home />} />  
        <Route path="base/register" element={<Register />} />     
        <Route path="base/mobiles" element={<Mobiles />} />
        <Route path="base/laptops" element={<Laptops />} />  
        <Route path="base/entertainment" element={<Entertainment />} />
        <Route path="base/about" element={<About />} />
        <Route path="base/home" element={<HomePage />} />
        <Route path="base/favourites" element={<Favourites />} />
        <Route path="base/cart" element={<Cart />} />

      </Routes>
    </Router>
    </>
  );
};



export default App;
