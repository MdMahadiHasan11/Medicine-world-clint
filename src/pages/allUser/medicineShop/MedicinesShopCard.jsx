import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCardItem from "../../../hooks/useCardItem";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { useState } from "react";
import MedicinesDetails from "./MedicinesDetails";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { FaBangladeshiTakaSign } from "react-icons/fa6";

const MedicinesShopCard = ({ requestItem, index }) => {
    const { user } = useAuth();
    const [refetch, allCardItem] = useCardItem();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    //
    const handleAddCard = (medicine) => {
        console.log(medicine._id)
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
            console.log('checkkkkkkkk', bookingDetails);
            axiosSecure.post(`/addCard`, bookingDetails)
                .then(res => {
                    if (res.data.insertedId) {
                        refetch();
                        Swal.fire({
                            position: "top-center",
                            icon: "success",
                            title: "Successfully Add to Card",
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

    const [modal, setModal] = useState(false)
    return (
        <tbody className=''>
            <tr className="hover">
                <td >
                    {index + 1}
                </td>
                <td>

                    {requestItem.medicinesName} <span className="text-xs">({
                        requestItem.massUnit
                    })</span>
                </td>

                <td >

                    {requestItem.genericName}
                </td>


                <td >

                    <p>
                        {requestItem.category}
                    </p>

                </td>
                <td  >
                <p className="flex ml-0 items-center justify-center"><FaBangladeshiTakaSign />{requestItem.perUnitPrice}</p>
                </td>
                <td >

                    <p>
                        {requestItem.discountPercentage}%
                    </p>

                </td>
                <td  >
                    <p className="flex items-center justify-center"><FaBangladeshiTakaSign />{requestItem.grandTotal}</p>
                </td>
                <td>


                    <button onClick={() => handleAddCard(requestItem)} className="btn btn-outline   font-bold text-lg"><MdOutlineAddShoppingCart />
                    </button>

                    <button onClick={() => setModal(true)} className="btn btn-outline  ml-5  font-bold text-lg"><FaEye></FaEye></button>
                </td>
                {modal && <MedicinesDetails requestItem={requestItem} onClose={() => setModal(false)}></MedicinesDetails>}
            </tr>

        </tbody>
    );
};

export default MedicinesShopCard;