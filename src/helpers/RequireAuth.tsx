import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../store/store";

export interface RequireAuth {
  children: ReactNode;
}

export const RequireAuth = ({ children }: RequireAuth) => {
  const jwt = useSelector((s: RootState) => s.user.jwt)

  if (!jwt) {
    return <Navigate to="/auth/login" replace={true} />;
  }

  return children;
};
