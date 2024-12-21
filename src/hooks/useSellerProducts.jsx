// import { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";

import { AuthContext } from "../Provider/AuthProvider";
import { useContext } from "react";
import useAxiosSecure from "./useAxiosSecure";

const useSellerProducts = () => {
    const axiosSecure = useAxiosSecure()
    const { userInformation } = useContext(AuthContext)
    const { data: sellerProducts = [], isPending: loading, refetch } = useQuery({
        queryKey: [userInformation?.email, 'sellerProducts'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/products/${userInformation.email}`);
            return res.data || [];
        }
    })


    return [sellerProducts, loading, refetch]
}

export default useSellerProducts;