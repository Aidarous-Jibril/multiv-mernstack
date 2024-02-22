import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const UserProtectedRoute = ({ children }) => {
  const { isLoading, userInfo } = useSelector((state) => state.auth);
  if (isLoading === false) {
    if (!userInfo) {
      return <Navigate to="/login" replace />;
    }
    return children;
  }
};

export default UserProtectedRoute;