import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useCardItem from "../../../hooks/useCardItem";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Card = ({ cardItem, index }) => {
    const [refetch, allCardItem] = useCardItem();
    // const [quantity, setQuantity] = useState(1);

    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    //  quantity 
    const handleUp = async (_id) => {
        const cardInfo = {
            quantity: cardItem.quantity + 1,
            perUnitPrice: cardItem.perUnitPrice,
            discountPercentage: cardItem.discountPercentage,


        }
        console.log(cardInfo)
        const res = await axiosSecure.patch(`/cardItemQuantity/${_id}`, cardInfo)
        console.log(res.data)
        if (res.data.modifiedCount) {
            refetch();
        }

    }
    const handleDown = async(_id) => {
        if(cardItem.quantity > 1){
            const cardInfo = {
                quantity: cardItem.quantity - 1,
                perUnitPrice: cardItem.perUnitPrice,
                discountPercentage: cardItem.discountPercentage,
    
    
            }
            console.log(cardInfo)
            const res = await axiosSecure.patch(`/cardItemQuantity/${_id}`, cardInfo)
            console.log(res.data)
            if (res.data.modifiedCount) {
                refetch();
            }
        }
    }


    // const doctorRes = await axiosSecure.patch(`/allDoctor/${_id}`, doctorInfo)
    // console.log(doctorRes.data)
    // if (doctorRes.data.modifiedCount) {
    //     // reset()
    //     setImage(res.data.data.display_url);
    //     Swal.fire({
    //         position: "top-center",
    //         icon: "success",
    //         title: "Your work has been saved",
    //         showConfirmButton: false,
    //         timer: 1500
    //     });
    // }


    // const [grandTotal, setGrandTotal] = useState(0);
    // useEffect(() => {
    //     const disC = (cardItem.perUnitPrice * cardItem.discountPercentage) / 100;
    //     const price = quantity * (cardItem.perUnitPrice - disC);
    //     setGrandTotal(price.toFixed(2))
    // }, [quantity])


    // setGrandTotal(price)
    // console.log(price);





    // delete one
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

                axiosSecure.delete(`/cardItem/${_id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            refetch();
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
                <td>{cardItem.company}</td>
                <th>{cardItem.perUnitPrice}</th>
                <th>{cardItem.discountPercentage}%</th>
                <td className='flex m-3 gap-4 justify-center items-center border'>

                    <div>
                        {cardItem.quantity}
                    </div>
                    <div className='flex flex-col'>
                        <button onClick={() => handleUp(cardItem._id)} className='pb-4'> <FaAngleUp /></button>

                        <button onClick={() => handleDown(cardItem._id)} className=''> <FaAngleDown /></button>
                    </div>

                </td>
                <td>{cardItem.grandTotal}</td>
                <td>
                    <button onClick={() => handleDelete(cardItem._id)} className="btn  btn-outline">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </td>
            </tr>
            {/* row 3 */}

        </tbody>

    );
};

export default Card;