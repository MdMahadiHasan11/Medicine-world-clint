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
            <tr className="tableStyle">
                <td className="px-2 py-4 text-center text-xs md:text-sm">{index + 1}</td>
                <td className="px-2 py-4 text-center text-xs md:text-sm ">{requestItem.medicinesName}</td>
                <td className="px-2 py-4 text-center text-xs md:text-sm">{requestItem.category}</td>
                <td className="px-2 py-4 text-center text-xs md:text-sm">
                    <div className="flex items-center justify-center">
                        <p className="flex items-center">
                        <FaBangladeshiTakaSign className="text-xs md:text-sm" />
                            <sub><del>{requestItem.perUnitPrice}</del></sub>
                            <span className="ml-1 text-xs md:text-sm font-semibold">{requestItem.grandTotal}</span>
                        </p>
                    </div>
                </td>
                <td className="px-2 py-4 text-center text-xs md:text-sm flex justify-center items-center gap-1">
                    <button
                        onClick={() => handleAddCard(requestItem)}
                        className="btn btn-outline hover:bg-primary transition-colors duration-200 text-primary font-semibold"
                    >
                        <MdOutlineAddShoppingCart className="text-lg" />
                        <span className="hidden md:inline">Add to Cart</span>
                    </button>
                    <button
                        onClick={() => setModal(true)}
                        className="btn btn-outline hover:bg-primary transition-colors duration-200 text-primary font-semibold"
                        aria-label={`View details for ${requestItem.medicinesName}`}
                    >
                        <FaEye className="text-lg" />
                        <span className="hidden md:inline">View</span>
                    </button>
                </td>
            </tr>

            {/* Modal for Medicine Details */}
            {modal && (
                <MedicinesDetails
                    className="my-16 border border-red-500"
                    requestItem={requestItem}
                    onClose={() => setModal(false)}
                />
            )}
        </>
    );
};

export default MedicinesShopCard;
