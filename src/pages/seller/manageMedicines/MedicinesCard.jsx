import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MedicinesCard = ({ cardItem,userMedicineRefetch, index }) => {
   const axiosSecure =useAxiosSecure();

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

                axiosSecure.delete(`/sellerMedicine/${_id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            userMedicineRefetch();
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
                <td>{cardItem.medicinesName}</td>
                <td>{cardItem.genericName}</td>
                <td>{cardItem.category}</td>
                 <td >
                    {cardItem.company}
                </td>
                <th>{cardItem.perUnitPrice}</th>
                <th>{cardItem.discountPercentage}%</th>
                <td>
                {/* onClick={() => handleDelete(cardItem._id)} */}
                    <button onClick={() => handleDelete(cardItem._id)}  className="btn  btn-outline">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </td>
            </tr>
            {/* row 3 */}

        </tbody>
    );
};

export default MedicinesCard;