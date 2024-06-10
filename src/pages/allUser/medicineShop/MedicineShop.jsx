import { Link, useLocation, useNavigate } from "react-router-dom";
import useAllMedicines from "../../../hooks/useAllMedicines";
import { FaEye } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../routes/authProvider/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useCardItem from "../../../hooks/useCardItem";
import MedicinesDetails from "./MedicinesDetails";
import MedicinesShopCard from "./MedicinesShopCard";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { IoIosArrowDown } from "react-icons/io";
import { Helmet } from "react-helmet";


const MedicineShop = () => {
    const [allMedicines, , refetch] = useAllMedicines()
    // 
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const location = useLocation();
    // const [refetch, allCardItem] = useCardItem();
    const axiosPublic = useAxiosPublic();
    // pagination
    const [allMedicine, setAllMedicines] = useState(allMedicines);
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, setPostPerPage] = useState(8);
    const lastPostIndex = currentPage * postPerPage;
    const firstPostIndex = lastPostIndex - postPerPage;
    const totalPage = Math.ceil(allMedicine.length / postPerPage);

    console.log('totallll pagination', totalPage)


    const currentPosts = (allMedicine.slice(firstPostIndex, lastPostIndex))

    const handleChange = (event) => {
        setCurrentPage(event.target.value);
        console.log('current:', currentPage)
    };

    const pageNumber = [];
    for (let i = 1; i <= totalPage; i++) {
        pageNumber.push(
            <input
                key={i}
                className="join-item btn btn-square"
                type="radio"
                name="options"
                aria-label={i.toString()}
                value={i.toString()}
                checked={currentPage === i.toString() || (i === 1 && currentPage === 1)}
                onChange={handleChange}
            />
        );
    }

    // 

    // 
    const [searchText, setSearchText] = useState('');
    // sort
    // const { data: medicine = [], isLoading, refetch: medicineRefetch } = useQuery({
    //     queryKey: ['medicine'],
    //     queryFn: async () => {
    //         const res = await axiosPublic.get(`/categoryMedicines/${category}`)
    //         return res.data;
    //     }
    // })

    useEffect(() => { setAllMedicines(allMedicines) }, [allMedicines])

    const handleDisplaySort = (sort) => {

        if (sort === 'Ascending') {
            const allMedicine = allMedicines.slice().sort((a, b) => a.grandTotal
                - b.grandTotal);
            setAllMedicines(allMedicine);

        }
        else if (sort === 'Descending') {
            const allMedicine = allMedicines.slice().sort((a, b) => b.grandTotal
                - a.grandTotal);
            setAllMedicines(allMedicine);

        }

    };


    // sort end


    // const searchText
    useEffect(() => {

        if (searchText.trim() !== "") {
            axiosPublic.get(`/allSearch/${searchText}`)
                .then(res => {
                    setAllMedicines(res.data);
                    // setLoading(false);
                })
            console.log('iffff')
        }
        else {

            // axiosPublic.get(`/categoryMedicines/${category}`)
            //     .then(res => {
            //         setAllMedicines(res.data);
            //         // setLoading(false);
            //     })
            // console.log('else')
            setAllMedicines(allMedicines)
        }


    }, [searchText])



    //
    // const handleAddCard = (medicine) => {
    //     console.log(medicine._id)
    //     if (user && user.email) {
    //         const bookingDetails = {
    //             userEmail: user.email,
    //             medicineId: medicine._id,
    //             medicinesName: medicine.medicinesName,
    //             perUnitPrice: medicine.perUnitPrice,
    //             discountPercentage: medicine.discountPercentage,
    //             category: medicine.category,
    //             massUnit: medicine.massUnit,
    //             company: medicine.company,
    //             grandTotal: medicine.grandTotal,
    //             quantity: 1




    //         }
    //         console.log('checkkkkkkkk', bookingDetails);
    //         axiosSecure.post(`/addCard`, bookingDetails)
    //             .then(res => {
    //                 if (res.data.insertedId) {
    //                     refetch();
    //                     Swal.fire({
    //                         position: "top-center",
    //                         icon: "success",
    //                         title: "Successfully appointment",
    //                         showConfirmButton: false,
    //                         timer: 1500
    //                     });
    //                 }
    //             })
    //     }
    //     else {
    //         Swal.fire({
    //             title: "You are not login",
    //             text: "Please login and booked appointment",
    //             icon: "warning",
    //             showCancelButton: true,
    //             confirmButtonColor: "#3085d6",
    //             cancelButtonColor: "#d33",
    //             confirmButtonText: "Yes, Login"
    //         }).then((result) => {
    //             if (result.isConfirmed) {

    //                 navigate('/login', { state: location.pathname });
    //             }
    //         });
    //     }
    // }
    //modal

    // 
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Shop</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            <div className=''>
                <p className="text-3xl font-bold  text-center bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 py-12  text-white"></p>
            </div>
            <div className="navbar bg-opacity-80 bg-blue-900 max-w-screen-xl text-white border ">
                <div className="flex-1 px-2 lg:flex-none">
                    <form>
                        <div className="flex-1 px-2 lg:flex-none">
                            <label className="input input-bordered flex items-center gap-2">
                                <input type="text" className="grow text-blue-600"
                                    name="searchText"
                                    value={searchText} onChange={(e) => setSearchText(e.target.value)}
                                    placeholder="Search" />
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                            </label>
                        </div>
                    </form>
                </div>
                {/* dropdown */}
                <div className="flex justify-center z-10 items-center">
                    <details className="dropdown">
                        <summary className="m-1 btn ">Sort<IoIosArrowDown /></summary>
                        <ul className="p-2 shadow menu text-black dropdown-content z-10 flex items-center bg-slate-300  font-bold rounded-box w-52">

                            <li  onClick={() => handleDisplaySort('Ascending')}><a>Ascending</a></li>
                            <li className="border-t-2" onClick={() => handleDisplaySort('Descending')}><a>Descending</a></li>
                        </ul>
                    </details>
                </div>
                {/* dropdown and icon */}
            </div>
            {/* form */}
            <div className="mb-5">
                <div className='mt-10'>
                    <p data-aos="fade-down"
                        data-aos-easing="ease-out-cubic"
                        data-aos-duration="1000" className="text-3xl font-bold rounded-2xl text-center uppercase  py-8 mt-6 mb-2 ">All Medicines Table
                    </p>
                </div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead className='bg-slate-100'>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Generic Name</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Discount</th>
                                <th>Grand Total</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        {
                            currentPosts.map((requestItem, index) =>
                                <MedicinesShopCard key={requestItem._id} requestItem={requestItem} index={index} ></MedicinesShopCard>

                            )
                        }



                    </table>
                </div>

            </div>
            {/* pagination */}
            <div className="flex mb-10 justify-center items-center">
                {pageNumber}
            </div>
        </div>
    );
};

export default MedicineShop;