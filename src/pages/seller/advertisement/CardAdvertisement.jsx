import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const CardAdvertisement = ({ cardItem,sellerBannerRefetch, index }) => {

    const axiosSecure = useAxiosSecure();

    // banner delete
    const handleDelete = (_id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/sellerBanner/${_id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            sellerBannerRefetch();
                        }
                    })
            }
        });
    }

    return (
        <tbody>
            {/* row */}

            <tr className="hover">
                <th>{index + 1}</th>

                <td>
                    <div className="avatar">
                        <div className="w-24 rounded-xl">
                            <img src={cardItem.image} />
                        </div>
                    </div>
                </td>
                <td>{cardItem.bannerHeader}</td>
                <td>{cardItem.description}</td>
                <td >
                    {cardItem.status}
                </td>
                <td>

                    <button onClick={() => handleDelete(cardItem._id)} className="btn  btn-outline">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </td>
            </tr>


        </tbody>
    );
};

export default CardAdvertisement;