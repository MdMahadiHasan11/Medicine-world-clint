import React, { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import UpdateManageCategory from './UpdateManageCategory';

const ManageCategoryCard = ({ cardItem, categoryRefetch, index }) => {
    const axiosSecure = useAxiosSecure();
    const [modal, setModal] = useState(false)

    // medicine delete
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

                axiosSecure.delete(`/admin/category/${_id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            categoryRefetch();
                            Swal.fire({
                                title: "Deleteddd!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });

                        }
                    })
            }
        });
    }
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
                <td>{cardItem.category}</td>
                <th>{cardItem.title}</th>
                <th>
                    <button onClick={() => handleDelete(cardItem._id,)} className='btn btn-outline' >Delete</button>
                    <button onClick={() => setModal(true)} className="btn btn-outline ">Update Category</button>
                </th>
            </tr>
            {/* row 3 */}

            {modal && <UpdateManageCategory cardItem={cardItem} categoryRefetch={categoryRefetch} onClose={() => setModal(false)}></UpdateManageCategory>}
        </tbody>
    );
};

export default ManageCategoryCard;