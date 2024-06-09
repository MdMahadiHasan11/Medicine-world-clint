import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";


const useAdminStat = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: allMedicinesStat = [], refetch :allMedicinesStatRefetch } = useQuery({
        queryKey: ['allMedicinesStat', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/sales/stat/`)
            return res.data;
        }
    })

    let paidAllMedicineStat;
    let pendingAllMedicineStat;
    if (allMedicinesStat[0]?.status === 'pending') {
        paidAllMedicineStat = allMedicinesStat[1]?.items;
        pendingAllMedicineStat = allMedicinesStat[0]?.items;
        // const totalPrice=paidMedicines.map((total,medicine)=>total+medicine.totalPrice,0);
        // console.log(totalPrice);
    } else {
        paidAllMedicineStat = allMedicinesStat[0]?.items;
        pendingAllMedicineStat = allMedicinesStat[1]?.items;
    }



    return [paidAllMedicineStat, pendingAllMedicineStat , allMedicinesStatRefetch];
};
export default useAdminStat;