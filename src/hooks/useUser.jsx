import { useQuery } from "@tanstack/react-query";

import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";


const useUser = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure()
    const { data: isUser, isPending: isUserLoading } = useQuery({
        queryKey: [user?.email, 'isUser'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/${user.email}`);
            // console.log(res.data);
            return res.data?.role === 'buyer';
        }
    })
    return [isUser, isUserLoading]
};

export default useUser;