import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

const ProtectedRoute = ({ children, admin }) => {
  const { cart } = useAppSelector((state) => state.cart);

  if (cart.length === 0) return <Navigate to="*" />;

  return children;
};

export default ProtectedRoute;
