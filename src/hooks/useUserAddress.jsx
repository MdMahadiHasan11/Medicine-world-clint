import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic"; // Custom axios instance
import { useContext } from "react";
import { AuthContext } from "../routes/authProvider/AuthProvider"; // Assuming you're using context for auth

// Custom hook to fetch user address
const useUserAddress = () => {
    const axiosPublic = useAxiosPublic(); // Axios instance
    const { user } = useContext(AuthContext); // Get the current user from Auth context

    const { data: userAddress = [], isPending: loading, refetch } = useQuery({
        queryKey: ['userAddress', user?.email], // Key based on user email
        queryFn: async () => {
            if (!user?.email) return []; // Prevent making the request if no user email
            const res = await axiosPublic.get(`/userAddress?email=${user.email}`); // Send email in query
            return res.data;
        },
        enabled: !!user?.email, // Only run if email exists
    });

    return [userAddress, loading, refetch];
};

export default useUserAddress;
