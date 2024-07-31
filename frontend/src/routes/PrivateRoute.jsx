import { selectedUserData } from "@/store/slices/auth-slice";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ role, children }) => {
  const userData = useSelector(selectedUserData);

  if (!userData) {
    return <Navigate to={"/login"} />;
  }

  if (role !== userData.role) {
    return <Navigate to={"/login"} />;
  }

  return children;
};

export default PrivateRoute;
