import {
  BrowserRouter,
  Navigate,
  Routes,
  Route,
  Router,
} from "react-router-dom";

import LoginPage from "./pages/login";
import AdminLayout from "./components/layouts/admin/AdminLayout";
import PrivateRoute from "./routes/PrivateRoute";
import { useEffect, useState } from "react";
import { AuthRoute } from "./routes/AuthRoute";
import axios from "axios";
import { HOST } from "./util/constant";
import { useDispatch, useSelector } from "react-redux";
import { selectedUserData, setUserData } from "./store/slices/auth-slice";
import DataAcaraPage from "./pages/admin/data-acara";
import DataJadwalPage from "./pages/admin/data-jadwal";
import DataPelajaranPage from "./pages/admin/data-pelajaran";
import DataKelasPage from "./pages/admin/data-kelas";
import DataGuruPage from "./pages/admin/data-guru";
import DataSiswaPage from "./pages/admin/data-siswa";
import AdminDashboard from "./pages/admin/admin-dashboard";
import TambahSiswaPage from "./pages/admin/tambah-siswa";
import EditSiswaPage from "./pages/admin/edit-siswa";
import TambahGuruPage from "./pages/admin/tambah-guru";
import EditGuruPage from "./pages/admin/edit-guru";
import DataUmumPage from "./pages/admin/data-umum";
import GuruLayout from "./components/layouts/guru/GuruLayout";
import GuruDashboardPage from "./pages/guru/guru-dashboard";

function App() {
  const dispatch = useDispatch();
  const userData = useSelector(selectedUserData);
  const [loading, setLoading] = useState(true);

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
        dispatch(setUserData(undefined));
      } finally {
        setLoading(false);
      }
    };

    if (!userData) {
      getData();
    }
  }, []);

  if (loading) {
    return <div className="bg-background fixed inset-0 "></div>;
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

        {/* admin */}
        <Route
          path="/admin"
          element={
            <PrivateRoute role={"admin"}>
              <AdminLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Navigate to="/admin/dashboard" />} />
          <Route
            path="dashboard"
            element={
              <PrivateRoute role={"admin"}>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="data-umum"
            element={
              <PrivateRoute role={"admin"}>
                <DataUmumPage />
              </PrivateRoute>
            }
          />
          <Route
            path={"data-siswa"}
            element={
              <PrivateRoute role={"admin"}>
                <DataSiswaPage />
              </PrivateRoute>
            }
          />
          <Route
            path={"tambah-siswa"}
            element={
              <PrivateRoute role={"admin"}>
                <TambahSiswaPage />
              </PrivateRoute>
            }
          />
          <Route
            path={"edit-siswa"}
            element={
              <PrivateRoute role={"admin"}>
                <EditSiswaPage />
              </PrivateRoute>
            }
          />

          <Route
            path="data-guru"
            element={
              <PrivateRoute role={"admin"}>
                <DataGuruPage />
              </PrivateRoute>
            }
          />

          <Route
            path="tambah-guru"
            element={
              <PrivateRoute role={"admin"}>
                <TambahGuruPage />
              </PrivateRoute>
            }
          />
          <Route
            path={"edit-guru"}
            element={
              <PrivateRoute role={"admin"}>
                <EditGuruPage />
              </PrivateRoute>
            }
          />

          <Route
            path="data-kelas"
            element={
              <PrivateRoute role={"admin"}>
                <DataKelasPage />
              </PrivateRoute>
            }
          />
          <Route
            path="data-pelajaran"
            element={
              <PrivateRoute role={"admin"}>
                <DataPelajaranPage />
              </PrivateRoute>
            }
          />
          <Route
            path="data-jadwal"
            element={
              <PrivateRoute role={"admin"}>
                <DataJadwalPage />
              </PrivateRoute>
            }
          />
          <Route
            path="data-acara"
            element={
              <PrivateRoute role={"admin"}>
                <DataAcaraPage />
              </PrivateRoute>
            }
          />
        </Route>
        {/* admin */}

        {/* <!-- Guru --> */}

        <Route
          path="/guru"
          element={
            <PrivateRoute role={"guru"}>
              <GuruLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Navigate to={"/guru/dashboard"} />} />
          <Route
            path={"dashboard"}
            element={
              <PrivateRoute role={"guru"}>
                <GuruDashboardPage />
              </PrivateRoute>
            }
          />
        </Route>

        {/* <!-- guru --> */}

        <Route path="*" element={<Navigate to={"/login"} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
