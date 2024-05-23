import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
 // Assuming Register is one of your page components
import Register from "./pages/Auth/Register.jsx"
import SignIn from "./pages/Auth/SignIn.jsx";
import Home from "./pages/Home/Home.jsx";
import HomePage from "./pages/Home/Home.jsx";
import Mobiles from "./pages/Products/Mobiles.jsx";
import ProductDetail from "./pages/Products/ProductDetail.jsx";
import Laptops from "./pages/Products/Laptops.jsx";
import About from "./pages/Home/About.jsx";
import Entertainment from "./pages/Products/Entertainment.jsx";
import Favourites from "./pages/Favourites.jsx";
import Cart from "./pages/Cart.jsx";



const App = () => {
  return (
<>
    <Router>
      <Routes>
         <Route path="/" element={<Home />} />  
        <Route path="base/register" element={<Register />} />     
        <Route path="base/mobiles" element={<Mobiles />} /> 
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="base/laptops" element={<Laptops />} />  
        <Route path="base/entertainment" element={<Entertainment />} />
        <Route path="base/about" element={<About />} />
        <Route path="base/home" element={<HomePage />} />
        <Route path="base/favourites" element={<Favourites />} />
        <Route path="base/cart" element={<Cart />} />
        <Route path="/login" element={<SignIn />}  />
      

      </Routes>
    </Router>
    </>
  );
};



export default App;
{/* <Router>
      <Routes>
     
        
        <Route path="/login" element={<SignIn />}  />
        <Route path="/home" element={<Home />} /> 
        <Route path="/mobiles" element={<Mobiles />} /> 
        <Route path="/products/:id" element={<ProductDetail />} />
      </Routes>
    </Router> */}