// import { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";

import { AuthContext } from "../Provider/AuthProvider";
import { useContext } from "react";
import useAxiosSecure from "./useAxiosSecure";

const useWishList = () => {
    const axiosSecure = useAxiosSecure()
    const { userInformation } = useContext(AuthContext)
    const { data: wishList = [], isPending: loading, refetch } = useQuery({
        queryKey: [userInformation?._id, 'wishList'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/wishList/${userInformation._id}`);
            return res.data || [];
        }
    })


    return [wishList, loading, refetch]
}

export default useWishList;