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
import { FcEmptyTrash } from "react-icons/fc";

const MedicineShop = () => {
    const [allMedicines, , refetch] = useAllMedicines();
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosPublic = useAxiosPublic();

    // Pagination
    const [allMedicine, setAllMedicines] = useState(allMedicines);
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, setPostPerPage] = useState(8);
    const lastPostIndex = currentPage * postPerPage;
    const firstPostIndex = lastPostIndex - postPerPage;
    const totalPage = Math.ceil(allMedicine.length / postPerPage);
    const currentPosts = allMedicine.slice(firstPostIndex, lastPostIndex);

    const handlePageChange = (pageNum) => {
        setCurrentPage(pageNum);
    };

    const handlePrevious = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPage) setCurrentPage(currentPage + 1);
    };

    const pageNumber = [];
    for (let i = 1; i <= totalPage; i++) {
        pageNumber.push(
            <button
                key={i}
                className={`join-item btn btn-square transition-colors duration-300 ${currentPage === i ? "" : " hover:bg-gray-200"}`}
                onClick={() => handlePageChange(i)}
            >
                {i}
            </button>
        );
    }

    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        setAllMedicines(allMedicines);
    }, [allMedicines]);

    const handleDisplaySort = (sort) => {
        const sortedMedicines = allMedicines.slice().sort((a, b) => {
            return sort === 'Ascending' ? a.grandTotal - b.grandTotal : b.grandTotal - a.grandTotal;
        });
        setAllMedicines(sortedMedicines);
    };

    useEffect(() => {
        if (searchText.trim() !== "") {
            axiosPublic.get(`/allSearch/${searchText}`)
                .then(res => {
                    setAllMedicines(res.data);
                });
        } else {
            setAllMedicines(allMedicines);
        }
    }, [searchText]);

    return (
        <div className="">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Shop</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            <div className="navbar  max-w-screen-xl border rounded-lg shadow-md mx-auto md:px-20 px-14 p-2">
                <div className="flex-1 ">
                    <form className="flex items-center">
                        <label className="input input-bordered flex items-center gap-2 border-gray-300 hover:border-blue-500 focus-within:border-blue-500 transition duration-200">
                            <input
                                type="text"
                                className="grow py-2 px-3 bg-transparent  placeholder-gray-400 focus:outline-none"  // General mood: Gray text
                                name="searchText"
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                placeholder="Search"
                            />
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="w-4 h-4 opacity-70"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </label>
                    </form>
                </div>
                <div className="flex items-center z-10 "> {/* Increased left margin for dropdown */}
                    <details className="dropdown">
                        <summary className="m-1 btn flex items-center border border-gray-300 hover:bg-gray-200 rounded-md transition duration-200 ">
                            Sort <IoIosArrowDown className="ml-1" />
                        </summary>
                        <ul className="p-2 shadow-lg menu dropdown-content z-10 bg-white rounded-box py-2 px-5"> {/* Dropdown background for light mode */}
                            <li onClick={() => handleDisplaySort('Ascending')}>
                                <a className="hover:bg-gray-200 rounded-md py-1 px-2 transition duration-200 text-gray-700">Ascending</a> {/* Gray text for items */}
                            </li>
                            <li className="border-t-2" onClick={() => handleDisplaySort('Descending')}>
                                <a className="hover:bg-gray-200 rounded-md py-1 px-2 transition duration-200 text-gray-700">Descending</a> {/* Gray text for items */}
                            </li>
                        </ul>
                    </details>
                </div>
            </div>





            <div className="mb-5">
                <div className='mt-10'>
                    <h1 data-aos="fade-down"
                        data-aos-easing="ease-out-cubic"
                        data-aos-duration="1000" className="text-3xl font-bold rounded-2xl text-center uppercase py-8 mt-6 mb-2">All Medicines Table
                    </h1>
                </div>
                {/* check currentPosts */}

                {currentPosts ?
                    <> <div className="overflow-x-auto">
                        <table className="table-style">
                            <thead>
                                <tr>
                                    <th className="text-center text-xs md:text-sm">#</th>
                                    <th className="text-center text-xs md:text-sm">Name</th>
                                    <th className="text-center text-xs md:text-sm">Category</th>
                                    <th className="text-center text-xs md:text-sm">Price</th>
                                    <th className="text-center text-xs md:text-sm">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentPosts.map((requestItem, index) => (
                                    <MedicinesShopCard key={requestItem._id} requestItem={requestItem} index={index + firstPostIndex} />
                                ))}
                            </tbody>
                        </table>
                    </div>

                        {/* Pagination */}
                        <div className="pagination-controls mt-8 flex justify-center items-center gap-2">
                            <button
                                className="btn btn-outline px-4 py-2 disabled:opacity-50"
                                onClick={handlePrevious}
                                disabled={currentPage === 1}
                            >
                                Previous
                            </button>
                            {pageNumber}
                            <button
                                className="btn btn-outline px-4 py-2 disabled:opacity-50"
                                onClick={handleNext}
                                disabled={currentPage === totalPage}
                            >
                                Next
                            </button>
                        </div>

                    </> :
                    <> <div className='flex flex-col  justify-center items-center'>
                        <FcEmptyTrash className='text-9xl' />
                        <h1 className='text-red-500'>Empty</h1>
                    </div></>}



            </div>


        </div>
    );
};

export default MedicineShop;
