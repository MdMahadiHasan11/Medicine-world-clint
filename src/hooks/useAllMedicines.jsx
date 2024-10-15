import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useAllMedicines = () => {
    // const [doctors, setDoctors] = useState([]);
    // const [loading, setLoading] = useState(true);

    // useEffect(() => {
        
    //         fetch('https://medicine-world-server.vercel.app/allDoctor')
    //             .then(res => res.json())
    //             .then(data =>{
    //                 setDoctors(data);
    //                 setLoading(false);
    //             })
        
    // }, [])
   



    const axiosPublic =useAxiosPublic();

    const {data : doctors =[] , isPending : loading ,refetch } = useQuery({
        queryKey:['doctors'],
        queryFn:async()=>{
            const res= await axiosPublic.get('/allMedicines');
            return res.data
        }
      })

    return [doctors,loading ,refetch]
}
export default useAllMedicines;