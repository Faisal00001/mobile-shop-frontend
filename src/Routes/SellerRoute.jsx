import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

import Loader from "../components/Loader/Loader";
import useSeller from "../hooks/useSeller";


const SellerRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [isSeller, isSellerLoading] = useSeller();
    const location = useLocation();
    const isLoading = loading || isSellerLoading;

    // useEffect(() => {
    //     if (!isLoading && isUserLoading && (!user || !isUser)) {
    //         toast.error("Access denied! Only buyers can access this page.");
    //     }
    // }, [isLoading, user, isUser, isUserLoading]);

    if (isLoading) {
        return <Loader />;
    }

    if (user && isSeller) {
        return children;
    }

    return <Navigate to="/" state={{ from: location }} replace />;
};

export default SellerRoute;
