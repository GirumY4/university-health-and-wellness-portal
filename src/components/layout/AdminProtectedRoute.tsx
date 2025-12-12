import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const AdminProtectedRoute = () => {
  const { user, isAuthenticated } = useAuth();

  // 1. Check if the user is logged in
  if (!isAuthenticated) {
    // Redirect unauthenticated users to login
    return <Navigate to="/login" replace />;
  }

  // 2. Check if the logged-in user has the 'admin' role
  if (user?.role !== "admin") {
    // If not admin, redirect them to the main student dashboard (or 403 Forbidden)
    // Redirecting to the dashboard is safer and more user-friendly.
    return <Navigate to="/dashboard" replace />;
  }

  // If authenticated and is admin, render the child routes
  return <Outlet />;
};

export default AdminProtectedRoute;
