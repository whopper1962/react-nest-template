import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

export const ProtectedRoute: React.FC = () => {
  const { user } = useContext(AuthContext);

  if (!user) return <Navigate to={`/signin`} />;

  return <Outlet />;
};
