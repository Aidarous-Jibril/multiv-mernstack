// export default SellerProtectedRoute;
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const SellerProtectedRoute = ({ children }) => {
  const { isLoading, storeInfo } = useSelector((state) => state.storeLogin);
  if (isLoading === false) {
    if (!storeInfo) {
      return <Navigate to="/" replace />;
    }
    return children;
  }
};

export default SellerProtectedRoute;