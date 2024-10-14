import { Swiper, SwiperSlide } from 'swiper/react';
import { useQuery } from '@tanstack/react-query';
import 'swiper/css';
import 'swiper/css/pagination';  // Import Swiper CSS for pagination
import 'swiper/css/bundle';
import { Autoplay, Pagination } from 'swiper/modules'; // Include Pagination module
import useAxiosPublic from '../../../../hooks/useAxiosPublic';
import { FaBangladeshiTakaSign } from 'react-icons/fa6';
import useAuth from '../../../../hooks/useAuth';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import useCardItem from '../../../../hooks/useCardItem';

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
                spaceBetween={20}
                pagination={{ clickable: true }}
                modules={[Autoplay, Pagination]} // Added Pagination module
                loop={true}
                autoplay={{
                    delay: 2000, // 2-second autoplay delay
                    disableOnInteraction: false,
                }}
                breakpoints={{
                    1024: {
                        slidesPerView: 3,
                    },
                    768: {
                        slidesPerView: 2,
                    },
                    640: {
                        slidesPerView: 1,
                    },
                }}
                className='mySwiper mt-4' // Added margin-top
            >
                {disMedicines.map((item) => (
                    <SwiperSlide key={item._id} className="flex items-center justify-center">
                        <div className="hero cardStyle border rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out flex flex-row gap-4 p-6 max-w-lg">
                            <img
                                src={item.image}
                                className="md:max-w-[130px] max-w-[120px] h-[150px] rounded-lg shadow-md"
                                alt={item.medicinesName}
                            />
                            <div className="flex-grow flex flex-col justify-between">
                                <div className="">
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
                                        state={{ requestItem: item }}
                                        className='btn btn-outline hover:bg-primary transition-colors duration-200 text-primary font-semibold mr-2 md:mb-2'>
                                        View
                                    </Link>
                                    <button onClick={() => handleAddCard(item)} className='btn btn-outline hover:bg-primary transition-colors duration-200 text-primary font-semibold'>Add to Card</button>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            {/* Add margin to pagination */}
            <div className="swiper-pagination mt-2" />
        </div>
    );
};

export default DiscountSlider;
