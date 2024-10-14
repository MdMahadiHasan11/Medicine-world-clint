import { useQuery } from '@tanstack/react-query';
import 'swiper/css';
import 'swiper/css/bundle';
import { FaBangladeshiTakaSign } from 'react-icons/fa6';
import useAuth from '../../../../hooks/useAuth';
import useAxiosPublic from '../../../../hooks/useAxiosPublic';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import useCardItem from '../../../../hooks/useCardItem';
import useAllMedicines from '../../../../hooks/useAllMedicines';

const NewMedicines = () => {
    const [refetch, allCardItem] = useCardItem();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();

    const { data: disMedicines = [] } = useQuery({
        queryKey: ['disMedicines'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/disMedicines`);
            return res.data;
        },
    });

    const [doctors] = useAllMedicines();
    const lastFiveItems = doctors.slice(-5); // Get last five items
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
                            timer: 1500,
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
                confirmButtonText: "Yes, Login",
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: location.pathname });
                }
            });
        }
    };

    // Duplicate items for display purposes
    const displayedItems = [...lastFiveItems, ...lastFiveItems]; // This ensures there are enough items for displaying

    return (
        <div className="mb-20">
            <div className="flex justify-center mx-auto items-center">
                <h1
                    data-aos="fade-down"
                    data-aos-easing="ease-out-cubic"
                    data-aos-duration="1000"
                    className="navbar py-10 flex justify-center items-center mx-auto text-center font-extrabold text-3xl max-w-screen-xl"
                >
                    New Medicines
                </h1>
            </div>

            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6 justify-items-center items-center">
                {displayedItems.map((item, index) => (
                    <MedicineCard key={`${item._id}-${index}`} item={item} onAddCard={handleAddCard} index={index} />
                ))}
            </div>

            {/* Pagination (for demonstration, add your pagination logic here) */}
            <div className="flex justify-center mt-4">
                <button className="btn btn-outline">Previous</button>
                <span className="mx-2">1</span>
                <button className="btn btn-outline">Next</button>
            </div>
        </div>
    );
};

const MedicineCard = ({ item, onAddCard, index }) => {
    return (
        <div className="hero cardStyle border rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out flex flex-row gap-4 p-6 max-w-lg">  {/* Added padding and consistent card styling */}
            {/* Image on the left */}
            <div className="flex-shrink-0">
                <img
                    src={item.image}
                    alt={item.title}
                    className="md:max-w-[130px] max-w-[120px] h-[150px] rounded-lg shadow-md"
                />
            </div>

            {/* Text on the right */}
            <div className="flex-grow flex flex-col justify-between">
                <div className=""> {/* Added margin to space the content */}
                    <div className="flex justify-between">
                        <div className="flex gap-2 items-center">
                            <h2 className="font-semibold  text-lg ">{item.medicinesName}</h2>
                            <sub className="">{item.massUnit}</sub>
                        </div>
                    </div>
                    <p className=" ">
                        <i>{item.discountPercentage}% <span className=''>OFF</span></i>
                    </p>
                </div>
                <div className="lg:flex justify-between items-center">
                    <div className="flex items-center ">
                        <p className="flex justify-center items-center mr-2">
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

                    <button onClick={() => onAddCard(item)} className='btn btn-outline hover:bg-primary transition-colors duration-200 text-primary font-semibold'>Add to Card</button>
                </div>
            </div>
        </div>
    );
};

export default NewMedicines;
