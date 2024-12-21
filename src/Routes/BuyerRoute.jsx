import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import useUser from "../hooks/useUser";
import Loader from "../components/Loader/Loader";


const BuyerRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [isUser, isUserLoading] = useUser();
    const location = useLocation();
    const isLoading = loading || isUserLoading;

    // useEffect(() => {
    //     if (!isLoading && isUserLoading && (!user || !isUser)) {
    //         toast.error("Access denied! Only buyers can access this page.");
    //     }
    // }, [isLoading, user, isUser, isUserLoading]);

    if (isLoading) {
        return <Loader />;
    }

    if (user && isUser) {
        return children;
    }

    return <Navigate to="/" state={{ from: location }} replace />;
};

export default BuyerRoute;
