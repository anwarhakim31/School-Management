import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/login";
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
import GuruDashboardPage from "./pages/guru/guru-dashboard";
import AbsenHarianPage from "./pages/guru/absen-harian";
import RekapDataPage from "./pages/guru/rekap-data";
import ProfileGuruPage from "./pages/guru/profile-guru";
import MasterDataPage from "./pages/admin/master-data";
import RekapAbsensiPage from "./pages/admin/rekap-absensi";
import DataSiswaPageguru from "./pages/guru/data-siswa";
import DataNilaiSiswaPage from "./pages/guru/data-nilai-siswa";
import RaporSiswaPage from "./pages/guru/rapor-siswa";
import RekapNilaiPageadmin from "./pages/admin/rekap-nilai";
import DataStudiPage from "./pages/guru/data-studi";
import SiswaDashboardPage from "./pages/siswa/siswa-dashboard";
import MainLayout from "./components/layouts/MainLayout";
import JadwalPelajaranPage from "./pages/siswa/jadwal-pelajaran";
import HasilRaporPage from "./pages/siswa/hasil-rapor";
import ProfileSiswaPage from "./pages/siswa/Profile-Siswa";

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
              <MainLayout />
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
            path="master-data"
            element={
              <PrivateRoute role={"admin"}>
                <MasterDataPage />
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
          <Route
            path="rekap-absensi-kelas"
            element={
              <PrivateRoute role={"admin"}>
                <RekapAbsensiPage />
              </PrivateRoute>
            }
          />
          <Route
            path="rekap-nilai-kelas"
            element={
              <PrivateRoute role={"admin"}>
                <RekapNilaiPageadmin />
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
              <MainLayout />
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
          <Route
            path={"absen-harian"}
            element={
              <PrivateRoute role={"guru"}>
                <AbsenHarianPage />
              </PrivateRoute>
            }
          />
          <Route
            path={"data-siswa"}
            element={
              <PrivateRoute role={"guru"}>
                <DataSiswaPageguru />
              </PrivateRoute>
            }
          />
          <Route
            path={"data-nilai"}
            element={
              <PrivateRoute role={"guru"}>
                <DataNilaiSiswaPage />
              </PrivateRoute>
            }
          />
          <Route
            path={"data-studi"}
            element={
              <PrivateRoute role={"guru"}>
                <DataStudiPage />
              </PrivateRoute>
            }
          />
          <Route
            path={"rekap-data"}
            element={
              <PrivateRoute role={"guru"}>
                <RekapDataPage />
              </PrivateRoute>
            }
          />
          <Route
            path={"rapor-siswa"}
            element={
              <PrivateRoute role={"guru"}>
                <RaporSiswaPage />
              </PrivateRoute>
            }
          />
          <Route
            path={"profile"}
            element={
              <PrivateRoute role={"guru"}>
                <ProfileGuruPage />
              </PrivateRoute>
            }
          />
        </Route>

        {/* <!-- guru --> */}

        <Route
          path="/siswa"
          element={
            <PrivateRoute role={"siswa"}>
              <MainLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Navigate to={"/siswa/dashboard"} />} />
          <Route
            path="dashboard"
            element={
              <PrivateRoute role={"siswa"}>
                <SiswaDashboardPage />
              </PrivateRoute>
            }
          />
          <Route
            path="jadwal-pelajaran"
            element={
              <PrivateRoute role={"siswa"}>
                <JadwalPelajaranPage />
              </PrivateRoute>
            }
          />
          <Route
            path="hasil-rapor"
            element={
              <PrivateRoute role={"siswa"}>
                <HasilRaporPage />
              </PrivateRoute>
            }
          />
          <Route
            path="profile"
            element={
              <PrivateRoute role={"siswa"}>
                <ProfileSiswaPage />
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
