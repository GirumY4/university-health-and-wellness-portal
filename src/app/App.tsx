import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Global, css } from "@emotion/react";
import { AuthProvider } from "../contexts/AuthContext";
import Layout from "../components/layout/Layout";
import AdminLayout from "../components/layout/AdminLayout";
import ProtectedRoute from "../routes/ProtectedRoute";
import AdminProtectedRoute from "../routes/AdminProtectedRoute";
import Login from "../features/auth/page/Login";
import Dashboard from "../features/dashboard/page/Dashboard";
import Appointments from "../features/appointments/page/Appointments";
import Records from "../features/records/page/Records";
import Wellness from "../features/wellness/page/Wellness";
import Support from "../features/support/page/Support";
import AdminDashboard from "../features/admin/page/AdminDashboard";
import StaffManagement from "../features/staffs/pages/StaffManagement";

const NotFound = () => (
  <h1 css={{ color: "red", padding: "2rem", textAlign: "center" }}>
    404 | Page Not Found
  </h1>
);

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Global
          styles={css`
            body {
              margin: 0;
              font-family: "Inter", sans-serif;
            }
            * {
              box-sizing: border-box;
            }
            html,
            body,
            #root {
              width: 100%;
              min-width: 100vw;
              height: 100%;
              min-height: 100vh;
            }
          `}
        />

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />

          <Route path="/admin" element={<AdminProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="staff" element={<StaffManagement />} />
              <Route path="settings" element={<NotFound />} />{" "}
            </Route>
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/app" element={<Layout />}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="appointments" element={<Appointments />} />
              <Route path="records" element={<Records />} />
              <Route path="wellness" element={<Wellness />} />
              <Route path="support" element={<Support />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
