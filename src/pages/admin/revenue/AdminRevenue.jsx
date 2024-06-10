// import React from 'react';

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AdminRevenue = () => {
    const axiosSecure = useAxiosSecure();
    const { data: allPayment = [] } = useQuery({
        queryKey: ['allPayment'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/admin/allPayment`);
            return res.data;
        }
    })
    const paid = allPayment[0];
    const pending = allPayment[1];
    

    const totalPaid = paid?.reduce((total, medicine) => total + medicine.grandTotal, 0);
    const totalPending= pending?.reduce((total, medicine) => total + medicine.grandTotal, 0);
    // const discountPrice = (invoices.reduce((total, medicine) => total + medicine.perUnitPrice, 0)) - totalPrice;
    console.log(totalPaid, totalPending)
    return (
        <div>
            <div className="flex mt-52  justify-center">
                <div className="stats stats-vertical lg:stats-horizontal shadow">

                    <div className="stat">
                        <div className="stat-title">Total Revenue</div>
                        <div className="stat-value">{(totalPaid+totalPending).toFixed(2)}</div>
                        <div className="stat-desc">{new Date().toLocaleDateString()}</div>
                    </div>

                    <div className="stat">
                        <div className="stat-title">Total Paid</div>
                        <div className="stat-value">{(totalPaid).toFixed(2)}</div>
                        <div className="stat-desc">{new Date().toLocaleDateString()}</div>
                    </div>

                    <div className="stat">
                        <div className="stat-title">Total Pending</div>
                        <div className="stat-value">{(totalPending).toFixed(2)}</div>
                        <div className="stat-desc">{new Date().toLocaleDateString()}</div>
                    </div>

                </div>
            </div>
            {/*  */}

        </div>
    );
};

export default AdminRevenue;