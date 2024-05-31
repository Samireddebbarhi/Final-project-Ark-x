import { Suspense } from "react";
//import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import Loader from "./helpers/Loader";
import { rolesConfig } from "./Routes/Routes";
import Layout from "./components/Layout/Layout";

//import Home from "./pages/Home/Home";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const routes = rolesConfig["user"];
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          {routes.routes.map((route, key) => {
            return route ? <Route key={key} {...route} /> : null;
          })}
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
