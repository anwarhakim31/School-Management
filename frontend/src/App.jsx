import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/login";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminLayout from "./components/layouts/AdminLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
        </Route>

        <Route path="*" element={<Navigate to={"/login"} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
