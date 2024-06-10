import { useContext } from "react";
import { AuthContext } from "../authProvider/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import PaymentCard from "../../pages/user/payment/PaymentCard";
import { Link, NavLink } from "react-router-dom";
import { FaHistory, FaHome } from "react-icons/fa";

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

            <div className="md:flex">
                <div className="md:w-64 min-h-screen bg-blue-400">
                    <ul className="menu">
                        <li className='mx-auto mb-5'><Link to='/userDashboard'>
                            <div className="avatar">
                                <div className="w-24 rounded-full">
                                    <img src={user.photoURL} />
                                </div>
                            </div>


                        </Link></li>
                       
                        <li><NavLink to='/invoice'> <FaHistory />Invoice History</NavLink></li>
                        <div className="divider divider-error"></div>

                        <li><NavLink to='/'> <FaHome />Home</NavLink></li>
                    </ul>


                </div>

                <div className="flex-1">

                    <p>haddddddddddddddddddddddddddddddddddddddd</p>
                    {/* <SellerDashboardRevenue></SellerDashboardRevenue> */}
                </div>

            </div>


            {/* <div className="overflow-x-auto">
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
            </div> */}
        </div>
    );
};

export default UserDashboard;