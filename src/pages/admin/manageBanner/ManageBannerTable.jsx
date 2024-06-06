import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../../routes/authProvider/AuthProvider";

const ManageBannerTable = ({ cardItem, bannerRefetch, index }) => {


    // const axiosPublic = useAxiosPublic();
    const {user} =useContext(AuthContext)
    const axiosSecure = useAxiosSecure();
    // handle start
    const handleAdd = () => {
        if (!(cardItem.status === 'active')) {
            const activebannerInfo =
            {
                sellerEmail: cardItem.email,
                bannerHeader: cardItem.bannerHeader,
                description: cardItem.description,
                image: cardItem.image,
            }
            // 
            const bannerInfoSeller =
            {
                status: 'active',
                adminEmail:user.email
            }
            // upRes.data.modifiedCount && res.data.insertedId
           axiosSecure.patch(`/admin/update/banner/${cardItem._id}`, bannerInfoSeller)
            // axiosSecure.post('/admin/active/banner', activebannerInfo)
                .then(res => {
                    if (res.data.modifiedCount) {
                        bannerRefetch();
                        Swal.fire({
                            position: "top-center",
                            icon: "success",
                            title: "Successfully Added Category",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                })
        } else {
            console.log('already add');
        }


        // 
    }
    // handle end

    // handle start
    const handleremove = () => {
        if ((cardItem.status === 'active')) {
            const activebannerInfo =
            {
                sellerEmail: cardItem.email,
                bannerHeader: cardItem.bannerHeader,
                description: cardItem.description,
                image: cardItem.image,
            }
            // 
            const bannerInfoSeller =
            {
                status: 'notActive',
                adminEmail:null
            }
            // res.data.modifiedCount && res.data.insertedId
           axiosSecure.patch(`/admin/update/banner/${cardItem._id}`, bannerInfoSeller)
            // axiosSecure.post('/admin/active/banner', activebannerInfo)
                .then(res => {
                    if (res.data.modifiedCount) {
                        bannerRefetch();
                        Swal.fire({
                            position: "top-center",
                            icon: "success",
                            title: "Successfully Added Category",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                })
        } else {
            console.log('already add');
        }


        // 
    }
    // handle end

    return (
        <tbody>


            <tr className="hover">
                <th>{index + 1}</th>
                <td>
                    <div className="avatar">
                        <div className="w-24 rounded-xl">
                            <img src={cardItem.image} />
                        </div>
                    </div>
                </td>
                <th>{cardItem.email}</th>
                <td>{cardItem.bannerHeader}</td>
                <td>{cardItem.status}</td>

                <th>
                    <button onClick={() => handleAdd(cardItem._id,)} className='btn btn-outline' >Active</button>
                    <button onClick={() => handleremove(cardItem._id,)} className='btn btn-outline' >Delete</button>

                </th>
            </tr>
        </tbody>
    );
};

export default ManageBannerTable;