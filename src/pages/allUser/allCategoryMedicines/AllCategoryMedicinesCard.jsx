import { useContext, useState } from "react";
import { AuthContext } from "../../../routes/authProvider/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useCardItem from "../../../hooks/useCardItem";
import AllCategoryDetails from "./AllCategoryDetails";
import MedicinesDetails from "../medicineShop/MedicinesDetails";
import { FaEye } from "react-icons/fa";

const AllCategoryMedicinesCard = ({ requestItem, index }) => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const location = useLocation();
    const [refetch, allCardItem] = useCardItem();
    //
    const handleAddCard = (medicine) => {
        if (user && user.email) {
            const bookingDetails = {
                userEmail: user.email,
                medicineId: medicine._id,
                medicinesName: medicine.medicinesName,
                perUnitPrice: medicine.perUnitPrice,
                discountPercentage: medicine.discountPercentage,
                category: medicine.category,
                massUnit: medicine.massUnit,
                company: medicine.company,
                grandTotal: medicine.grandTotal,
                quantity: 1




            }
            console.log('catcard', bookingDetails)
            axiosSecure.post(`/addCard`, bookingDetails)
                .then(res => {
                    if (res.data.insertedId) {
                        refetch();
                        Swal.fire({
                            position: "top-center",
                            icon: "success",
                            title: "Successfully appointment",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                })
        }
        else {
            Swal.fire({
                title: "You are not login",
                text: "Please login and booked appointment",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Login"
            }).then((result) => {
                if (result.isConfirmed) {

                    navigate('/login', { state: location.pathname });
                }
            });
        }
    }
    // 

    const [modal, setModal] = useState(false)
    return (
        <tbody className='bg-white divide-y divide-gray-200 '>
            <tr>
                <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                    {index + 1}
                </td>
                <td className='px-4 py-4 text-sm text-gray-500 flex gap-3 items-center   whitespace-nowrap'>

                    {requestItem.medicinesName}
                </td>

                <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                    {requestItem.genericName}
                </td>


                <td className='px-4 py-4 text-sm whitespace-nowrap'>
                    <div className='flex items-center gap-x-2'>
                        <p
                            className='px-3 py-1 rounded-full text-blue-500 bg-blue-100/60
                               text-xs'
                        >
                            {requestItem.category}
                        </p>
                    </div>
                </td>
                <td className='px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap'>
                    <div className='inline-flex items-center px-3 py-1 rounded-full gap-x-2  '>
                        {
                            requestItem.massUnit
                        }

                    </div>
                </td>
                <td className='px-4 py-4 text-sm whitespace-nowrap'>
                    <div className='flex items-center gap-x-2'>
                        <p
                            className='px-3 py-1 rounded-full text-blue-500 bg-blue-100/60
                               text-xs'
                        >
                            {requestItem.perUnitPrice}
                        </p>
                    </div>
                </td>
                <td className='px-4 py-4 text-sm whitespace-nowrap'>
                    <div className='flex items-center gap-x-2'>
                        <p
                            className='px-3 py-1 rounded-full text-blue-500 bg-blue-100/60
                               text-xs'
                        >
                            {requestItem.discountPercentage}%
                        </p>
                    </div>
                </td>
                <td className='px-4 py-4 text-sm whitespace-nowrap'>


                    <button onClick={() => handleAddCard(requestItem)} className="btn btn-outline btn-success  font-bold text-lg">Select</button>

                    <button onClick={() => setModal(true)} className="btn btn-outline btn-success ml-5  font-bold text-lg"><FaEye></FaEye></button>

                </td>
            </tr>
            {modal && <MedicinesDetails requestItem={requestItem} onClose={() => setModal(false)}></MedicinesDetails>}
        </tbody>
    );
};

export default AllCategoryMedicinesCard;