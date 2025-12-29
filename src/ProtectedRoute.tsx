// src/routes/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { useAppSelector } from "./hooks";
import type { JSX } from "react";


const ProtectedRoute = ({
  children,
  allowedRoles,
}: {
  children: JSX.Element;
  allowedRoles?: string[];
}) => {
  const token = useAppSelector((s) => s.auth.token);
  const role = useAppSelector((s) => s.auth.user?.role);

  if (!token) return <Navigate to="/login" replace />;

  if (allowedRoles && role && !allowedRoles.includes(role)) {
    return <Navigate to="/article" replace />;
  }

  return children;
};

export default ProtectedRoute;
