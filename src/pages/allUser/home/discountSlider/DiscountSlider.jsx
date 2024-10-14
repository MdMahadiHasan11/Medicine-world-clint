import { Swiper, SwiperSlide } from 'swiper/react';
import { useQuery } from '@tanstack/react-query';
import 'swiper/css';
import 'swiper/css/bundle';
import { Autoplay } from 'swiper/modules'; // Removed Pagination and kept Autoplay
import useAxiosPublic from '../../../../hooks/useAxiosPublic';
import { FaBangladeshiTakaSign, FaEye } from 'react-icons/fa6';
import useAuth from '../../../../hooks/useAuth';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import useCardItem from '../../../../hooks/useCardItem';
import MedicinesDetails from '../../medicineShop/MedicinesDetails';
import { useState } from 'react';
import DiscountSliderViewDetails from './DiscountSliderViewDetails';

const DiscountSlider = () => {
    const [refetch, allCardItem] = useCardItem();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();

    const { data: disMedicines = [] } = useQuery({
        queryKey: ['disMedicines'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/disMedicines`);
            return res.data;
        }
    });

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

    const [modal, setModal] = useState(false)

    return (
        <div className=''>
            <div className='flex justify-center mx-auto items-center'>
                <h1
                    data-aos="fade-down"
                    data-aos-easing="ease-out-cubic"
                    data-aos-duration="1000"
                    style={{ color: 'var(--primary-color)' }}
                    className="navbar py-10 flex justify-center items-center mx-auto text-center font-extrabold text-3xl max-w-screen-xl"
                >
                    Discount Medicines
                </h1>
            </div>
            <Swiper
                spaceBetween={20} // Increase space between slides for cleaner look
                pagination={false} // Disable pagination (slider points)
                modules={[Autoplay]} // Only Autoplay module is used
                loop={true}
                autoplay={{
                    delay: 3000, // 3 seconds
                    disableOnInteraction: false, // Allow autoplay to continue after interactions
                }}
                breakpoints={{
                    // Responsive breakpoints
                    1024: {
                        slidesPerView: 3, // 3 slides on large screens
                    },
                    768: {
                        slidesPerView: 2, // 2 slides on medium screens
                    },
                    640: {
                        slidesPerView: 1, // 1 slide on small screens
                    },
                }}
                className='mySwiper'
            >
                {disMedicines.map((item) => (
                    <SwiperSlide key={item._id} className="flex items-center justify-center"> {/* Removed padding and margin from each slide */}
                        <div className="hero cardStyle border rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out flex flex-row gap-4 p-6 max-w-lg"> {/* Added padding and consistent card styling */}
                            {/* Image on the left */}
                            <img
                                src={item.image}
                                className="md:max-w-[130px] max-w-[120px] h-[150px] rounded-lg shadow-md" // Reduced size
                                alt={item.medicinesName}
                            />

                            {/* Text on the right */}
                            <div className="flex-grow flex flex-col justify-between">
                                <div className=""> {/* Added margin to space the content */}
                                    <div className="flex justify-between">
                                        <div className="flex gap-2 items-center">
                                            <h2 className="text-lg font-medium">{item.medicinesName}</h2>
                                            <sub className="">{item.massUnit}</sub>
                                        </div>
                                    </div>
                                    <p className="">
                                        <i>{item.discountPercentage}% <span className=''>OFF</span></i>
                                    </p>
                                </div>
                                <div className="lg:flex justify-between items-center">
                                    <div className="flex items-center ">
                                        <p className="flex justify-center items-center mr-2 ">
                                            <FaBangladeshiTakaSign />
                                            <del className="">{item.perUnitPrice}</del>
                                        </p>
                                        <p className=""><FaBangladeshiTakaSign /></p>
                                        <p className="">{item.grandTotal}</p>
                                    </div>

                                </div>
                                <div className='mt-3'>
                                    <Link
                                        to="/discountSliderViewDetails"
                                        state={{ requestItem: item }}  // Passing item in the state
                                        className='btn btn-outline hover:bg-primary transition-colors duration-200 text-primary font-semibold mr-2 md:mb-2'>
                                        View
                                    </Link>

                                    <button onClick={() => handleAddCard(item)} className='btn btn-outline hover:bg-primary transition-colors duration-200 text-primary font-semibold'>Add to Card</button>

                                </div>
                            </div>
                        </div>
                        {/* {modal && <MedicinesDetails requestItem={item} onClose={() => setModal(false)}></MedicinesDetails>} */}

                    </SwiperSlide>


                ))}
            </Swiper>


        </div>
    );
};

export default DiscountSlider;
