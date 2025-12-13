import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import Loader from "../Common/Loader";

const PublicRoute = () => {
  const { user, isAuthChecked } = useAuthStore();

  if (!isAuthChecked) {
    return (
      <>
        <Loader />
      </>
    ); // or spinner
  }

  return user ? <Navigate to="/my-account" replace /> : <Outlet />;
};

export default PublicRoute;
