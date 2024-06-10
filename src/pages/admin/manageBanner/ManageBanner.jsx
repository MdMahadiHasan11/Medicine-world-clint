import { useContext } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../routes/authProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import ManageBannerTable from "./ManageBannerTable";
import { Helmet } from "react-helmet";

const ManageBanner = () => {
    const { user } = useContext(AuthContext);

    const axiosSecure = useAxiosSecure();

    const { data: allBanner = [], refetch: bannerRefetch } = useQuery({
        queryKey: ['allBanner'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/admin/banner`)
            return res.data;
        }
    })
    // console.log(allBanner);
    return (
        <div>
            
<Helmet>
                <meta charSet="utf-8" />
                <title>Admin Dashboard Banner</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead className='bg-slate-100'>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Category Name</th>
                            <th>Title</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {
                        allBanner.map((cardItem, index) =>
                            <ManageBannerTable key={cardItem._id} cardItem={cardItem} bannerRefetch={bannerRefetch} index={index}></ManageBannerTable>
                        )
                    }
                </table>
            </div>
        </div>
    );
};

export default ManageBanner;