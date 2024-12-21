// import { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";

import { AuthContext } from "../Provider/AuthProvider";
import { useContext } from "react";
import useAxiosSecure from "./useAxiosSecure";

const useCart = () => {
    const axiosSecure = useAxiosSecure()
    const { userInformation } = useContext(AuthContext)
    const { data: userCart = [], isPending: loading, refetch } = useQuery({
        queryKey: [userInformation?._id, 'cart'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/cart/${userInformation._id}`);
            return res.data || [];
        }
    })


    return [userCart, loading, refetch]
}

export default useCart;