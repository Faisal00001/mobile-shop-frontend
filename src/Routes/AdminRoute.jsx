import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

import Loader from "../components/Loader/Loader";
import useAdmin from "../hooks/useAdmin";


const AdminRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();
    const isLoading = loading || isAdminLoading;

    // useEffect(() => {
    //     if (!isLoading && isUserLoading && (!user || !isUser)) {
    //         toast.error("Access denied! Only buyers can access this page.");
    //     }
    // }, [isLoading, user, isUser, isUserLoading]);

    if (isLoading) {
        return <Loader />;
    }

    if (user && isAdmin) {
        return children;
    }

    return <Navigate to="/" state={{ from: location }} replace />;
};

export default AdminRoute;
