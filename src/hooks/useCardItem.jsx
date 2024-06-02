import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";


const useCardItem = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {data: allCardItem = [] ,refetch } = useQuery({
    queryKey: ['allCardItem', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/cardItem?email=${user.email}`)
      return res.data;
    }
  })
  return [refetch,allCardItem];
};
export default useCardItem;