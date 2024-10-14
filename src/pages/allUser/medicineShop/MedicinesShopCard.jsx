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
                quantity: 1,
            };

            axiosSecure.post(`/addCard`, bookingDetails).then((res) => {
                if (res.data.insertedId) {
                    refetch();
                    Swal.fire({
                        position: "top-center",
                        icon: "success",
                        title: "Successfully Added to Cart",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            });
        } else {
            Swal.fire({
                title: "You are not logged in",
                text: "Please log in to add items to your cart",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Login",
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/login", { state: location.pathname });
                }
            });
        }
    };

    const [modal, setModal] = useState(false);

    return (
        <>
            <tr className="hover:bg-gray-100 border-b border-gray-200">
                <td className="px-4 py-4 text-center">{index + 1}</td>
                <td className="px-4 py-4">
                    {requestItem.medicinesName}{" "}
                    <span className="text-xs text-gray-500">({requestItem.massUnit})</span>
                </td>
                <td className="px-4 py-4 text-center">{requestItem.genericName}</td>
                <td className="px-4 py-4 text-center">{requestItem.category}</td>
                <td className="px-4 py-4 text-center">
                    <p className="flex items-center justify-center">
                        <FaBangladeshiTakaSign className="mr-1" /> {requestItem.perUnitPrice}
                    </p>
                </td>
                <td className="px-4 py-4 text-center">{requestItem.discountPercentage}%</td>
                <td className="px-4 py-4 text-center">
                    <p className="flex items-center justify-center">
                        <FaBangladeshiTakaSign className="mr-1" /> {requestItem.grandTotal}
                    </p>
                </td>
                <td className="px-4 py-4 text-center">
                    <div className="flex justify-center items-center gap-2">
                        <button
                            onClick={() => handleAddCard(requestItem)}
                            className="btn btn-outline btn-primary flex items-center gap-2 px-4 py-2 font-bold"
                        >
                            <MdOutlineAddShoppingCart className="text-lg" /> Add to Cart
                        </button>
                        <button
                            onClick={() => setModal(true)}
                            className="btn btn-outline btn-secondary flex items-center gap-2 px-4 py-2 font-bold"
                        >
                            <FaEye className="text-lg" /> View
                        </button>
                    </div>
                </td>
            </tr>

            {/* Modal for Medicine Details */}
            {modal && (
                <div >
                    <MedicinesDetails  className="my-16 border border-red-500 "
                        requestItem={requestItem}
                        onClose={() => setModal(false)}
                    />
                </div>
            )}
        </>
    );
};

export default MedicinesShopCard;
