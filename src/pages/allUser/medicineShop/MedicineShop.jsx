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
            <div className="navbar navbarStyle max-w-screen-xl border rounded-lg shadow-md mx-auto">
                <div className="flex-1 px-2 lg:flex-none">
                    <form>
                        <div className="flex-1 px-2 lg:flex-none">
                            <label className="input input-bordered flex items-center gap-2">
                                <input
                                    type="text"
                                    className="grow  focus:outline-none"
                                    name="searchText"
                                    value={searchText}
                                    onChange={(e) => setSearchText(e.target.value)}
                                    placeholder="Search"
                                />
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
                                    <path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" />
                                </svg>
                            </label>
                        </div>
                    </form>
                </div>
                <div className="flex justify-center z-10 items-center">
                    <details className="dropdown">
                        <summary className="m-1 btn">Sort<IoIosArrowDown /></summary>
                        <ul className="p-2 shadow menu  dropdown-content z-10 flex items-center  font-bold rounded-box w-52">
                            <li onClick={() => handleDisplaySort('Ascending')}><a>Ascending</a></li>
                            <li className="border-t-2" onClick={() => handleDisplaySort('Descending')}><a>Descending</a></li>
                        </ul>
                    </details>
                </div>
            </div>

            <div className="mb-5">
                <div className='mt-10'>
                    <p data-aos="fade-down"
                        data-aos-easing="ease-out-cubic"
                        data-aos-duration="1000" className="text-3xl font-bold rounded-2xl text-center uppercase py-8 mt-6 mb-2">All Medicines Table
                    </p>
                </div>
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
                            {currentPosts.map((requestItem, index) => (
                                <MedicinesShopCard key={requestItem._id} requestItem={requestItem} index={index + firstPostIndex} />
                            ))}
                        </tbody>
                    </table>
                </div>
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
        </div>
    );
};

export default MedicineShop;
