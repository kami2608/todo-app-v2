import { Navigate } from "react-router-dom";
import { AuthURLs } from "../../constants/Auth.paths";
import type { FC } from "react";
import type { ReactChildren } from "../../types/ReactChildren";
import { AppURLs } from "../../constants/App.paths";

const AuthProvider: FC<ReactChildren> = ({ children }) => {
  if (
    !localStorage.getItem("userProfile") &&
    window.location.pathname !== "/login"
  ) {
    return <Navigate to={AuthURLs.login} replace />;
  }
  if (
    localStorage.getItem("userProfile") &&
    window.location.pathname === "/login"
  ) {
    return <Navigate to={AppURLs.home} replace />;
  }

  return <>{children}</>;
};

export default AuthProvider;
