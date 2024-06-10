import { useContext, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import AddAdvertisement from "./AddAdvertisement";
import { AuthContext } from "../../../routes/authProvider/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import CardAdvertisement from "./CardAdvertisement";
import { Helmet } from "react-helmet";

const Advertisement = () => {
    const { user } = useContext(AuthContext);

    const axiosSecure = useAxiosSecure();
    const { data: sellerBanner = [], refetch: sellerBannerRefetch } = useQuery({
        queryKey: ['sellerBanner'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/sellerBanner/${user.email}`)
            return res.data;
        }
    })
    console.log(sellerBanner);

    const [modal, setModal] = useState(false)

    return (
        <div className="ml-10 mt-10">

            <Helmet>
                <meta charSet="utf-8" />
                <title>Manage Advertisement</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            <div>
                <div className="flex justify-center items-center my-6">
                    <button onClick={() => setModal(true)} className="btn btn-outline btn-wide">Add Medicines</button>
                </div>

                <div className="overflow-x-auto">
                    <table className="table">
                        <thead className='bg-slate-100'>
                            <tr>
                                <th>#</th>
                                <th>Banner Image</th>
                                <th>Header</th>
                                <th>Short Description</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        {
                            sellerBanner.map((cardItem, index) =>
                                <CardAdvertisement key={cardItem._id} cardItem={cardItem} sellerBannerRefetch={sellerBannerRefetch} index={index} ></CardAdvertisement>
                            )
                        }



                    </table>
                </div>

            </div>
            <div>
                {/* userMedicineRefetch={userMedicineRefetch} */}
                {modal && <AddAdvertisement sellerBannerRefetch={sellerBannerRefetch} onClose={() => setModal(false)}></AddAdvertisement>}
            </div>


        </div>
    );
};

export default Advertisement;