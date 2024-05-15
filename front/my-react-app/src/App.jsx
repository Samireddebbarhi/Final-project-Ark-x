import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
 // Assuming Register is one of your page components
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";


const App = () => {
  return (
    <Router>
      <Routes>
     
        
        <Route path="/login" element={<SignIn />}  />
        <Route path="/home" element={<Home />} /> 
      </Routes>
    </Router>
  );
};



export default App;