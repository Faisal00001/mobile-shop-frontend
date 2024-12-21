import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://mobile-shop-server-mu.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;