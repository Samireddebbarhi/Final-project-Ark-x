import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/register"; // Assuming Register is one of your page components

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/gjyu" element={<Home />} /> 
        <Route path="/" element={<Register />} />    
      </Routes>
    </Router>
  );
};

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Home Page!</h1>
    </div>
  );
};

export default App;
