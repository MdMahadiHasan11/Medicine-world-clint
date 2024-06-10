import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";

const useInvoice= () => {
  
    const axiosPublic =useAxiosPublic()
    const{user}=useAuth();

    const {data : invoices = [],refetch :invoiceRefetch } = useQuery({
        queryKey: ['invoice'],
        queryFn:async()=>{
            const res= await axiosPublic.get(`/payments/invoice/${user.email}`);
            return res.data
        }
      })

    return [invoices,invoiceRefetch];
}
export default useInvoice;