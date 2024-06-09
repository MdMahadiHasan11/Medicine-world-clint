import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";


const useSellerStat = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: sellerMedicinesInfo = [], refetch } = useQuery({
        queryKey: ['sellerMedicinesInfo', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/seller/stat/${user.email}`)
            return res.data;
        }
    })

    let paidMedicines;
    let pendingMedicines;
    if (sellerMedicinesInfo[0]?.status === 'pending') {
        paidMedicines = sellerMedicinesInfo[1];
        pendingMedicines = sellerMedicinesInfo[0];
        // const totalPrice=paidMedicines.map((total,medicine)=>total+medicine.totalPrice,0);
        // console.log(totalPrice);
    } else {
        paidMedicines = sellerMedicinesInfo[0];
        pendingMedicines = sellerMedicinesInfo[1];
    }


    return [paidMedicines,pendingMedicines, refetch];
};
export default useSellerStat;