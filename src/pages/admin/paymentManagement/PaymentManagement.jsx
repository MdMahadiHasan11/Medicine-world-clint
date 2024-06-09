import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import PaymentCard from "./PaymentCard";

const PaymentManagement = () => {
    const axiosSecure = useAxiosSecure();
    const { data: allPayment = [], refetch: paymentRefetch } = useQuery({
        queryKey: ['allPayment'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/admin/payment`)
            return res.data;
        }
    })
    console.log(allPayment);
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead className='bg-slate-100'>
                        <tr>
                            <th>#</th>
                            <th>Email</th>
                            <th>Date</th>
                            <th>Price</th>
                            <th>Discount</th>
                            <th>Grand Total</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {
                        allPayment.map((cardItem, index) =>
                            <PaymentCard key={cardItem._id} cardItem={cardItem} paymentRefetch={paymentRefetch} index={index}></PaymentCard>
                        )
                    }
                </table>
            </div>
        </div>
    );
};

export default PaymentManagement;