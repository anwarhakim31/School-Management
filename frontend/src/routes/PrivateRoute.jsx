import { selectedUserData } from "@/store/slices/auth-slice";

import { useSelector } from "react-redux";
import {
  Navigate,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

const limit = [7, 14, 21];

const PrivateRoute = ({ role, children }) => {
  const userData = useSelector(selectedUserData);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  if (searchParams.get("page") && searchParams.get("page") < 1) {
    navigate(pathname, { replace: true });
  }

  if (
    searchParams.get("limit") &&
    !limit.includes(parseInt(searchParams.get("limit")))
  ) {
    navigate(pathname, { replace: true });
  }

  if (!userData) {
    return <Navigate to={"/login"} />;
  }

  if (role !== userData.role) {
    return <Navigate to={"/login"} />;
  }

  return children;
};

export default PrivateRoute;
