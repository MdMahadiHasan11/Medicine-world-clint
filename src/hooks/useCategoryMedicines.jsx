import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useCategoryMedicines = () => {
  
    const axiosPublic =useAxiosPublic()

    const {data : category = [],refetch :categoryRefetch } = useQuery({
        queryKey: ['category'],
        queryFn:async()=>{
            const res= await axiosPublic.get(`/allCategory`);
            return res.data
        }
      })

    return [category,categoryRefetch];
}
export default useCategoryMedicines;