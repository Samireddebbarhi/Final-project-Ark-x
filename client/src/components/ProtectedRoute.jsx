import React from "react";
import { Outlet, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ element, ...rest }) => {
  const isAuthenticated = useSelector((state) => state.auth.user !== null);

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
