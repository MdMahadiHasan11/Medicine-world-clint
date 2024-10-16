import { useContext } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../routes/authProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import ManageUserCard from "./ManageUserCard";
import { Helmet } from "react-helmet";


const ManageUsers = () => {
    const { user } = useContext(AuthContext);

    const axiosSecure = useAxiosSecure();
    const { data: allUser = [], refetch: userRefetch } = useQuery({
        queryKey: ['allUser'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/allUser`)
            return res.data;
        }
    })
    console.log(allUser);
    return (
        <div className="my-20 ml-10 ">

            <Helmet>
                <meta charSet="utf-8" />
                <title>Manage User</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            <p className="text-3xl font-bold text-center mb-10">All Users</p>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead className='bg-slate-100'>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {
                        allUser.map((cardItem, index) =>
                            <ManageUserCard key={cardItem._id} cardItem={cardItem} userRefetch={userRefetch} index={index}></ManageUserCard>
                        )
                    }
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;