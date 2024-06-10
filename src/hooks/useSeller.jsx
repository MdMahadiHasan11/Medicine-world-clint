import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';
import { useContext } from 'react';
import { AuthContext } from '../routes/authProvider/AuthProvider';

const useSeller = () => {
    const {user,loading} =useContext(AuthContext)
    const axiosSecure = useAxiosSecure();
  const {data : isSeller , isPending : isSellerLoading} = useQuery({
    queryKey:[user?.email,'isSeller'],
    enabled : !loading,
    queryFn:async()=>{
        const res= await axiosSecure.get(`/user/seller/${user.email}`);
        // console.log(res.data);
        return res.data?.seller;
    }
  })
  return [isSeller,isSellerLoading];
};
export default useSeller;