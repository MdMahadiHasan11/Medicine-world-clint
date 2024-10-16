import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { Helmet } from 'react-helmet';
import { IoIosArrowDown } from 'react-icons/io';
import { FcEmptyTrash } from 'react-icons/fc';
import AllCategoryMedicinesCard from './AllCategoryMedicinesCard';
import MedicinesShopCard from "../medicineShop/MedicinesShopCard";

const AllCategoryMedicine = () => {
    const { category } = useParams();
    const axiosPublic = useAxiosPublic();
    const [searchText, setSearchText] = useState('');
    const [medicine, setMedicine] = useState([]);
    const [medicines, setMedicines] = useState([]);

    // Fetch medicines when component mounts
    useEffect(() => {
        axiosPublic.get(`/categoryMedicines/${category}`)
            .then(res => {
                setMedicine(res.data);
                setMedicines(res.data);
            })
            .catch(error => console.error("Error fetching medicines:", error));
    }, [category, axiosPublic]);

    // Handle search functionality
    useEffect(() => {
        if (searchText.trim() !== "") {
            axiosPublic.get(`/search/${category}/${searchText}`)
                .then(res => setMedicines(res.data))
                .catch(error => console.error("Error searching medicines:", error));
        } else {
            setMedicines(medicine);
        }
    }, [searchText, category, axiosPublic, medicine]);

    // Handle sorting functionality
    const handleDisplaySort = (sort) => {
        const sortedMedicines = [...medicine];
        if (sort === 'Ascending') {
            sortedMedicines.sort((a, b) => a.grandTotal - b.grandTotal);
        } else if (sort === 'Descending') {
            sortedMedicines.sort((a, b) => b.grandTotal - a.grandTotal);
        }
        setMedicines(sortedMedicines);
    };




    // Pagination
    const [allMedicine, setAllMedicines] = useState(medicines);
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

    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Shop</title>
            </Helmet>

            {/* Navbar and Search Section */}
            <div className="navbar max-w-screen-xl border rounded-lg shadow-md mx-auto md:px-20 px-4 p-2">
                <div className="flex-1">
                    <form className="flex items-center">
                        <label className="input input-bordered flex items-center gap-2 border-gray-300 hover:border-blue-500 focus-within:border-blue-500 transition duration-200">
                            <input
                                type="text"
                                className="grow py-2 px-3 bg-transparent  placeholder-gray-400 focus:outline-none"
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

                {/* Sort Dropdown */}
                <div className="flex items-center z-10 ml-10">
                    <details className="dropdown">
                        <summary className="m-1 btn flex items-center border border-gray-300 hover:bg-gray-200 rounded-md transition duration-200 ">
                            Sort <IoIosArrowDown className="ml-1" />
                        </summary>
                        <ul className="p-2 shadow-lg menu dropdown-content z-10 bg-white rounded-box py-2 px-5">
                            <li onClick={() => handleDisplaySort('Ascending')}>
                                <a className="hover:bg-gray-200 rounded-md py-1 px-2 transition duration-200 text-gray-700">
                                    Ascending
                                </a>
                            </li>
                            <li className="border-t-2" onClick={() => handleDisplaySort('Descending')}>
                                <a className="hover:bg-gray-200 rounded-md py-1 px-2 transition duration-200 text-gray-700">
                                    Descending
                                </a>
                            </li>
                        </ul>
                    </details>
                </div>
            </div>

            {/* Medicine Table Section */}
            <div className="mb-5">
                <div className="mt-10">
                    <h2
                        data-aos="fade-down"
                        data-aos-easing="ease-out-cubic"
                        data-aos-duration="1000"
                        className="text-3xl font-bold rounded-2xl text-center uppercase py-8 mt-6 mb-2"
                    >
                        {category} Medicines Table
                    </h2>
                </div>

                {medicines.length ? (<>
                    <div className="overflow-x-auto">
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
                                {/* {medicines?.map((requestItem, index) => (
                                    <AllCategoryMedicinesCard requestItem={requestItem} index={index} key={requestItem._id} />
                                ))} */}

                                {medicines?.map((requestItem, index) => (
                                    <MedicinesShopCard key={requestItem._id} requestItem={requestItem} index={index + firstPostIndex} />
                                ))}
                            </tbody>
                        </table>
                    </div>

{/* pagination */}
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

                </>

                ) : (
                    <div className="flex flex-col justify-center items-center">
                        <FcEmptyTrash className="text-9xl" />
                        <h1 className="text-red-500">No Medicines Found</h1>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllCategoryMedicine;
