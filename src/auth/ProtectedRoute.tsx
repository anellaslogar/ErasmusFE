import { Navigate } from "react-router-dom";
import { UserStudent } from "../models/UserStudent";

import { ReactNode } from "react";

interface ProtectedRouteProps {
  user: UserStudent | null;
  requiredRole: "user" | "admin";
  children: ReactNode;
}

export function ProtectedRoute({
  user,
  requiredRole,
  children,
}: ProtectedRouteProps) {
  if (!user) return <Navigate to="/login" />;
  if (user.role !== requiredRole) return <Navigate to="/unauthorized" />;
  return <>{children}</>;
}
