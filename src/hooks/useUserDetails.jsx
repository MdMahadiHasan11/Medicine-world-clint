import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useUserDetails = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    // Only run the query if `user.email` exists
    const { data: userInfo = [], refetch, isLoading, isError, error } = useQuery({
        queryKey: ['userInfo', user?.email],
        queryFn: async () => {
            if (!user?.email) {
                // Return empty data if user is not authenticated
                return {};
            }
            const res = await axiosSecure.get(`/userInfo/${user.email}`);
            return res.data.user;
        },
        enabled: !!user?.email // Only enable the query if email exists
    });

    return { userInfo, refetch, isLoading, isError, error };
};

export default useUserDetails;
