import { useQuery } from "@tanstack/react-query";

import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";


const useSeller = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure()
    const { data: isSeller, isPending: isSellerLoading } = useQuery({
        queryKey: [user?.email, 'isSeller'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/${user.email}`);
            return res.data?.role === 'seller';
        }
    })
    return [isSeller, isSellerLoading]
};

export default useSeller;