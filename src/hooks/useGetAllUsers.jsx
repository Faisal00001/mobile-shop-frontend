import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useGetAllUsers = () => {

    const axiosSecure = useAxiosSecure()
    const { data: allUsers, isPending: isAllUsersLoading, refetch } = useQuery({
        queryKey: ['allUsers'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users`);
            // console.log(res.data);
            return res.data;
        }
    })
    return [allUsers, isAllUsersLoading, refetch]
};

export default useGetAllUsers;