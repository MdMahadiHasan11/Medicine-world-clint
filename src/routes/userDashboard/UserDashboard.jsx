import { useContext } from "react";
import { AuthContext } from "../authProvider/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import PaymentCard from "../../pages/user/payment/PaymentCard";

const UserDashboard = () => {
    const { user } = useContext(AuthContext);

    const axiosSecure = useAxiosSecure();
    const { data: userPayments = [], refetch } = useQuery({
        queryKey: [' userPayments'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/payment/${user.email}`)
            return res.data;
        }
    })

    console.log(userPayments);

    return (
        <div>

            <div className="overflow-x-auto">
                <table className="table">
                    <thead className='bg-slate-100'>
                        <tr>
                            <th>#</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Transaction Id</th>
                            <th>Discount Price</th>
                            <th>Grand Total</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    {
                        userPayments.map((cardItem, index) =>
                            <PaymentCard key={cardItem._id} cardItem={cardItem} index={index} ></PaymentCard>
                        )
                    }



                </table>
            </div>
        </div>
    );
};

export default UserDashboard;