import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Global, css } from "@emotion/react";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import Layout from "./components/layout/Layout";
import AdminLayout from "./components/layout/AdminLayout";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import AdminProtectedRoute from "./components/layout/AdminProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Appointments from "./pages/Appointments";
import Records from "./pages/Records";
import Wellness from "./pages/Wellness";
import Support from "./pages/Support";
import AdminDashboard from "./pages/AdminDashboard";
import StaffManagement from "./pages/StaffManagement";

const NotFound = () => (
  <h1 css={{ color: "red", padding: "2rem", textAlign: "center" }}>
    404 | Page Not Found
  </h1>
);

function App() {
  return (
    <ThemeProvider>
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
    </ThemeProvider>
  );
}

export default App;
