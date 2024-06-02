
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { FaEye } from 'react-icons/fa';
import { useContext } from 'react';
import { AuthContext } from '../../../routes/authProvider/AuthProvider';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import useCardItem from '../../../hooks/useCardItem';

const AllCategoryMedicine = () => {
    const { category } = useParams();
    const [ refetch ,allCardItem ] =useCardItem();

    const axiosPublic = useAxiosPublic()
    const { data: medicines = [], refetch : medicineRefetch } = useQuery({
        queryKey: ['medicines'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/categoryMedicines/${category}`)
            return res.data;
        }
    })
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const location = useLocation();
    //
    const handleAddCard = (medicine) => {
        if (user && user.email) {
            const bookingDetails = {
                userEmail: user.email,
                medicineId: medicine._id,
                medicineName: medicine.name,               
                perUnitPrice: medicine.perUnitPrice,
                discountPercentage: medicine.discountPercentage,
                category:medicine.category,
                massUnit:medicine.massUnit,



            }
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
    // 

    return (
        <div>
            <p>shop:{medicines.length}</p>

            {/* form */}
            <div className="mb-20">
                <div className='mt-10'>
                    <p data-aos="fade-down"
                        data-aos-easing="ease-out-cubic"
                        data-aos-duration="1000" className="text-3xl font-bold rounded-2xl text-center bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 py-8 mt-6 mb-2 text-white">All Medicines Table
                    </p>
                </div>

                <div className='flex flex-col mt-6'>
                    <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
                        <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
                            <div className='overflow-hidden border border-gray-200  md:rounded-lg'>
                                <table className='min-w-full divide-y divide-gray-200'>
                                    <thead className='bg-gray-50 text-lg font-bold'>
                                        <tr>
                                            <th
                                                scope='col'
                                                className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                                            >
                                                <span className="text-lg font-bold">Si No</span>
                                            </th>
                                            <th
                                                scope='col'
                                                className='py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500'
                                            >
                                                <div className='flex items-center gap-x-3'>
                                                    <span className="text-lg font-bold">Name</span>
                                                </div>
                                            </th>

                                            <th
                                                scope='col'
                                                className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                                            >
                                                <span className="text-lg font-bold">Generic Name</span>
                                            </th>



                                            <th
                                                scope='col'
                                                className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                                            >
                                                <span className="text-lg font-bold">Category</span>
                                            </th>

                                            <th
                                                scope='col'
                                                className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                                            >
                                                <span className="text-lg font-bold">Mass Unit</span>
                                            </th>
                                            <th
                                                scope='col'
                                                className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                                            >
                                                <span className="text-lg font-bold">Per Unit Price</span>
                                            </th>
                                            <th
                                                scope='col'
                                                className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                                            >
                                                <span className="text-lg font-bold">Discount Percentage</span>
                                            </th>

                                            <th className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'>
                                                <span className="text-lg font-bold">Action</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    {
                                        medicines.map((requestItem, index) =>
                                            <tbody key={requestItem._id} className='bg-white divide-y divide-gray-200 '>
                                                <tr>
                                                    <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                                                        {index + 1}
                                                    </td>
                                                    <td className='px-4 py-4 text-sm text-gray-500 flex gap-3 items-center   whitespace-nowrap'>

                                                        {requestItem.medicinesName}
                                                    </td>

                                                    <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                                                        {requestItem.genericName}
                                                    </td>


                                                    <td className='px-4 py-4 text-sm whitespace-nowrap'>
                                                        <div className='flex items-center gap-x-2'>
                                                            <p
                                                                className='px-3 py-1 rounded-full text-blue-500 bg-blue-100/60
                               text-xs'
                                                            >
                                                                {requestItem.category}
                                                            </p>
                                                        </div>
                                                    </td>
                                                    <td className='px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap'>
                                                        <div className='inline-flex items-center px-3 py-1 rounded-full gap-x-2  '>
                                                            {
                                                                requestItem.massUnit
                                                            }

                                                        </div>
                                                    </td>
                                                    <td className='px-4 py-4 text-sm whitespace-nowrap'>
                                                        <div className='flex items-center gap-x-2'>
                                                            <p
                                                                className='px-3 py-1 rounded-full text-blue-500 bg-blue-100/60
                               text-xs'
                                                            >
                                                                {requestItem.perUnitPrice}
                                                            </p>
                                                        </div>
                                                    </td>
                                                    <td className='px-4 py-4 text-sm whitespace-nowrap'>
                                                        <div className='flex items-center gap-x-2'>
                                                            <p
                                                                className='px-3 py-1 rounded-full text-blue-500 bg-blue-100/60
                               text-xs'
                                                            >
                                                                {requestItem.discountPercentage}%
                                                            </p>
                                                        </div>
                                                    </td>
                                                    <td className='px-4 py-4 text-sm whitespace-nowrap'>


                                                        <button onClick={() => handleAddCard(requestItem)} className="btn btn-outline btn-success  font-bold text-lg">Select</button>

                                                        <Link to={`/details/${requestItem._id}`}><button className="btn btn-outline btn-success ml-5  font-bold text-lg"><FaEye></FaEye></button></Link>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        )
                                    }
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AllCategoryMedicine;