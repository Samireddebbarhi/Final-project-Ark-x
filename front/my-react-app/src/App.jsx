import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
 // Assuming Register is one of your page components
import SignIn from "./pages/SignIn";
import Home from "./pages/Home/Home.jsx";
import Mobiles from "./pages/Products/Mobiles.jsx";
import ProductDetail from "./components/Cards/ProductDetail.jsx";


const App = () => {
  return (
    <Router>
      <Routes>
     
        
        <Route path="/login" element={<SignIn />}  />
        <Route path="/home" element={<Home />} /> 
        <Route path="/mobiles" element={<Mobiles />} /> 
        <Route path="/products/:id" element={<ProductDetail />} />
      </Routes>
    </Router>
  );
};



export default App;