import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const AdminRoute = ({ children }) => {
  const user = useAuthStore((state) => state.user);

  if (!user || user.role !== "admin") {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default AdminRoute;
