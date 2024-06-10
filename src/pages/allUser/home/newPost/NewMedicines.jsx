import { Swiper, SwiperSlide } from 'swiper/react';
import { useQuery } from '@tanstack/react-query';
import 'swiper/css';
import 'swiper/css/bundle';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import useAxiosPublic from '../../../../hooks/useAxiosPublic';
import { FaBangladeshiTakaSign } from 'react-icons/fa6';
import useAuth from '../../../../hooks/useAuth';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import useCardItem from '../../../../hooks/useCardItem';
import useAllMedicines from '../../../../hooks/useAllMedicines';




const NewMedicines = () => {
    const [refetch, allCardItem] = useCardItem();
    const navigate =useNavigate();

    // const axiosPublic = useAxiosPublic()

    const axiosPublic = useAxiosPublic()


    const { data: disMedicines = [] } = useQuery({
        queryKey: ['disMedicines'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/disMedicines`)
            return res.data;
        }
    })
    const [doctors ] =useAllMedicines();

    const lastFiveItems = doctors.slice(-5);
    // console.log('last',lastFiveItems);

    const {user}=useAuth();
    const axiosSecure=useAxiosSecure();


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
            // console.log('checkkkkkkkk', bookingDetails);
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
    return (
        <div className='mb-20'>
            <div className=''>

                <div className='flex justify-center  mx-auto items-center'>
                    <p data-aos="fade-down "
                        data-aos-easing="ease-out-cubic"
                        data-aos-duration="1000" className="navbar flex justify-center mb-10  items-center mx-auto text-center font-extrabold text-3xl bg-opacity-50 bg-black max-w-screen-xl text-white"><span></span>New Medicines</p>
                </div>
                <Swiper
                    slidesPerView={2}
                    spaceBetween={100}
                    // navigation={true}
                    centeredSlides={true}
                    pagination={
                        { clickable: true }
                    }

                    modules={[Pagination]}

                    loop={true}
                    // autoplay={
                    //     { delay: 3000 }
                    // }
                    className='mySwiper'
                >
                    {
                        lastFiveItems.map((item) =>
                            <SwiperSlide key={item._id}>



                                <div className="hero border  bg-base-200">
                                    <div className="hero-content flex-col lg:flex-row">
                                        <img src={item.image} className="md:max-w-[200px] max-w-[150px]  h-[200px] rounded-lg shadow-2xl" />
                                        <div>
                                            <div className="flex justify-between">
                                                <div className="flex gap-2 items-center">
                                                    <h2 className="font-bold md:text-3xl text-xl">{item.medicinesName}</h2>
                                                    <p>({item.massUnit})</p>
                                                </div>
                                            </div>
                                            <h1>({item.genericName})</h1>
                                            <h1 className="lg:text-5xl md:text-3xl text-xl mb-5  font-bold"><i>{item.discountPercentage}% <span className='text-red-500'>OFF</span></i></h1>
                                            
                                            <div className="lg:flex justify-between items-center">

                                                <div className="flex justify-center items-center">
                                                    <p className="flex justify-center items-center mr-2"><FaBangladeshiTakaSign />
                                                        <del >
                                                            {item.perUnitPrice}
                                                        </del>
                                                    </p>
                                                    <p className="text-xl font-bold"><FaBangladeshiTakaSign /></p>
                                                    <p className="text-xl font-bold">{item.grandTotal}</p>
                                                </div>

                                                <div>
                                                    <button onClick={()=>handleAddCard(item)} className='btn ml-4 btn-outline'>Add to Card</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </SwiperSlide>
                        )
                    }



                </Swiper>
            </div>
        </div>
    );
};
export default NewMedicines;