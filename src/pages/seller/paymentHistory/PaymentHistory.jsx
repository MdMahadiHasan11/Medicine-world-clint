import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import PaymentHistoryCard from "./PaymentHistoryCard";
import useSellerStat from "../../../hooks/useSellerStat";

const PaymentHistory = () => {
    // const { user } = useAuth();
    // const axiosSecure = useAxiosSecure();
    // const { data: sellerMedicinesInfo = [] } = useQuery({
    //     queryKey: ['sellerMedicinesInfo'],
    //     queryFn: async () => {
    //         const res = await axiosSecure.get(`/seller/stat/${user.email}`)
    //         return res.data;
    //     }
    // })

    const [paidMedicines,pendingMedicines]=useSellerStat();


    // let paidMedicines;
    // let pendingMedicines;
    // if (sellerMedicinesInfo[0]?.status === 'pending') {
    //     paidMedicines = sellerMedicinesInfo[1];
    //     pendingMedicines = sellerMedicinesInfo[0];
    //     // const totalPrice=paidMedicines.map((total,medicine)=>total+medicine.totalPrice,0);
    //     // console.log(totalPrice);
    // } else {
    //     paidMedicines = sellerMedicinesInfo[0];
    //     pendingMedicines = sellerMedicinesInfo[1];
    // }
    // console.log('hiiii', pendingMedicines)

    return (
        <div>
            <div>
                <div className="flex justify-between">
                    <p>Total Paid :{paidMedicines?.items.reduce((total,item)=>total+item.revenue,0)}</p>
                    <p>Total Pending :{pendingMedicines?.items.reduce((total,item)=>total+item.revenue,0)}</p>
                </div>
                <div className="overflow-x-auto">

                    <table className="table">
                        <thead className='bg-slate-100'>
                            <tr>
                                {/* <th>#</th> */}
                                <th>Medicine Name</th>
                                <th>Quantity</th>
                                <th>Total Price</th>
                                <th>Discount</th>
                                <th>Grand Total</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        {
                            paidMedicines?.items.map((cardItem, index) =>
                                <PaymentHistoryCard key={cardItem.medicinesName} cardItem={cardItem} index={index} ></PaymentHistoryCard>
                            )
                        }
                        {
                            pendingMedicines?.items.map((cardItem, index) =>
                                <PaymentHistoryCard key={cardItem.medicinesName} cardItem={cardItem} index={index} ></PaymentHistoryCard>
                            )
                        }



                    </table>
                </div>

            </div>
        </div>
    );
};

export default PaymentHistory;