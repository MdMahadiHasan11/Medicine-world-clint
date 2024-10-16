import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { useLocation } from "react-router-dom";


import { useQuery } from '@tanstack/react-query';
import 'swiper/css';
import 'swiper/css/bundle';
import useAxiosPublic from '../../../../hooks/useAxiosPublic';
import useAuth from '../../../../hooks/useAuth';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import useCardItem from '../../../../hooks/useCardItem';

const DiscountSliderViewDetails = () => {
    const location = useLocation();
    const { requestItem } = location.state || {}; // Destructure requestItem from location.state


    //add card

    const [refetch, allCardItem] = useCardItem();
    const navigate = useNavigate();


    const { user } = useAuth();
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

            axiosSecure.post(`/addCard`, bookingDetails)
                .then(res => {
                    if (res.data.insertedId) {
                        refetch();
                        Swal.fire({
                            position: "top-center",
                            icon: "success",
                            title: "Successfully added to cart",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                });
        } else {
            Swal.fire({
                title: "You are not logged in",
                text: "Please log in to book an appointment",
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
    };

    return (
        <div className="min-h-screen flex items-center cardStyle  justify-center border p-4">
            <div className="max-w-4xl w-full rounded-lg shadow-lg border flex flex-col lg:flex-row overflow-hidden">
                {/* Hero Image with Fixed Height */}
                <div className="md:w-1/2 md:h-96  h-64 relative overflow-hidden shadow-lg rounded-lg"> {/* Shadow and rounded corners */}
                    <img
                        className="w-full h-full s transition-transform duration-300 ease-in-out hover:scale-105"
                        src={requestItem.image}
                        alt={requestItem.medicinesName}
                    />
                </div>


                <div className="lg:w-1/2 p-6 flex flex-col justify-between">
                    <div className="flex flex-grow flex-col justify-start">
                        <div className=""> {/* Added margin to space the content */}
                            <div className="flex justify-between">
                                <div className="flex gap-2 items-center">
                                    <h2 className="font-bold md:text-3xl text-2xl requestItem">{requestItem.medicinesName}</h2>
                                    <sub className="">{requestItem.massUnit}</sub>
                                </div>
                            </div>
                            <p className="text-xl font-bold ">
                                <i>{requestItem.discountPercentage}% <span className=''>OFF</span></i>
                            </p>
                        </div>
                        <div className="lg:flex justify-between items-center">
                            <div className="flex items-center ">
                                <p className="flex justify-center items-center mr-2 text-lg">
                                    <FaBangladeshiTakaSign />
                                    <del className="">{requestItem.perUnitPrice}</del>
                                </p>
                                <p className="text-xl font-bold"><FaBangladeshiTakaSign /></p>
                                <p className="text-xl font-bold">{requestItem.grandTotal}</p>
                            </div>

                        </div>

                        <hr className="border-t  my-4" />
                        <div className="flex justify-between text-xs lg:text-sm">
                            <p>Categoryy: {requestItem.category}</p>
                            <p>Company: {requestItem.company}</p>

                        </div>

                    </div>

                    <p className="text-sm lg:text-md font-medium">{requestItem.description}</p>
                    <hr className="border-t  my-4" />

                    <div className='mt-3 flex justify-evenly'>
                        {/* <button onClick={() => handleAddCard(requestItem)} className='btn btn-outline hover:bg-primary transition-colors duration-200 text-primary font-semibold'>Add to Card</button> */}

                        <button onClick={() => handleAddCard(requestItem)} className='btn btn-outline hover:bg-primary transition-colors duration-200 text-primary font-semibold'>Add to Card</button>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default DiscountSliderViewDetails;
