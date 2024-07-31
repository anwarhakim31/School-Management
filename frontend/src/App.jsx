import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/login";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminLayout from "./components/layouts/admin/AdminLayout";
import PrivateRoute from "./routes/PrivateRoute";
import { useEffect, useState } from "react";
import { AuthRoute } from "./routes/AuthRoute";
import axios from "axios";
import { HOST } from "./util/constant";
import { useDispatch, useSelector } from "react-redux";
import { selectedUserData, setUserData } from "./store/slices/auth-slice";

function App() {
  const dispatch = useDispatch();
  const userData = useSelector(selectedUserData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(HOST + "/api/auth/get-auth", {
          withCredentials: true,
        });

        if (res.status === 200) {
          dispatch(setUserData(res.data.user));
        }
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (!userData) {
      getData();
    }
  }, []);

  if (loading) {
    return null;
  }

  if (error) {
    return <div>Errror</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <AuthRoute>
              <LoginPage />
            </AuthRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <PrivateRoute role={"admin"}>
              <AdminLayout />
            </PrivateRoute>
          }
        >
          <Route
            index
            element={
              <PrivateRoute role={"admin"}>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="dashboard"
            element={
              <PrivateRoute role={"admin"}>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
        </Route>

        <Route path="*" element={<Navigate to={"/login"} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
