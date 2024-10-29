import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Loader from "./helpers/Loader";
import { rolesConfig, ProtectedRoutesConfig } from "./Routes/Routes";
import Layout from "./components/Layout/Layout";
import ProtectedRoute from "./helpers/ProtectedRoutes";

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
        <Route element={<ProtectedRoute />}>
          {ProtectedRoutesConfig.routes.map((route, key) => {
            return route ? <Route key={key} {...route} /> : null;
          })}
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
