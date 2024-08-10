import { selectedUserData } from "@/store/slices/auth-slice";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const AuthRoute = ({ children }) => {
  const userData = useSelector(selectedUserData);

  const isAuthenticate = !userData;

  return isAuthenticate ? children : <Navigate to={`/${userData?.role}`} />;
};
