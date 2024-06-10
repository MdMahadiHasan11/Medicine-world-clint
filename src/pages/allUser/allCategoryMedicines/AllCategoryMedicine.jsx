
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { FaEye } from 'react-icons/fa';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../routes/authProvider/AuthProvider';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import useCardItem from '../../../hooks/useCardItem';
import AllCategoryMedicinesCard from './AllCategoryMedicinesCard';
import { IoIosArrowDown } from 'react-icons/io';
import axios from 'axios';
import useCategoryAllMedicines from '../../../hooks/useCategoryAllMedicines';
import { Helmet } from 'react-helmet';

const AllCategoryMedicine = () => {
    const { category } = useParams();
    const axiosPublic = useAxiosPublic()
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
    const [medicine, medicineRefetch] = useCategoryAllMedicines();

    const [medicines, setMedicines] = useState(medicine);

    const handleDisplaySort = (sort) => {

        if (sort === 'Ascending') {
            const medicines = medicine.slice().sort((a, b) => a.grandTotal
                - b.grandTotal);
            setMedicines(medicines);

        }
        else if (sort === 'Descending') {
            const medicines = medicine.slice().sort((a, b) => b.grandTotal
                - a.grandTotal);
            setMedicines(medicines);
        }

    };


    // sort end


    // const searchText
    useEffect(() => {

        if (searchText.trim() !== "") {
            axiosPublic.get(`/search/${category}/${searchText}`)
                .then(res => {
                    setMedicines(res.data);
                    // setLoading(false);
                })
            console.log('iffff')
        }
        else {

            axiosPublic.get(`/categoryMedicines/${category}`)
                .then(res => {
                    setMedicines(res.data);
                    // setLoading(false);
                })
            console.log('else')
        }


    }, [searchText])
    // useEffect(() => {


    // }, [medicines]);




    // loading error
    // if (isloading) {
    //     return <div>Loading...</div>;
    // }

    return (
        // <div>
        //     {/* {loading ? <span className="loading loading-spinner loading-lg"></span> : ''} */}
        //     <p>shop:{medicines.length}</p>
        //     <div className="navbar bg-gray-50 border rounded-box">
        //         <div className="flex-1 px-2 lg:flex-none">
        //             <form>
        //                 <div className="flex-1 px-2 lg:flex-none">
        //                     <label className="input input-bordered flex items-center gap-2">
        //                         <input type="text" className="grow"
        //                             name="searchText"
        //                             value={searchText} onChange={(e) => setSearchText(e.target.value)}
        //                             placeholder="Search" />
        //                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
        //                     </label>
        //                 </div>
        //             </form>
        //         </div>
        //         {/* dropdown */}
        //         <div className="flex justify-center z-10 items-center">
        //             <details className="dropdown">
        //                 <summary className="m-1 btn bg-orange-600">Volunteers Need Sort<IoIosArrowDown /></summary>
        //                 <ul className="p-2 shadow menu dropdown-content z-10 bg-base-300  font-bold rounded-box w-52">

        //                     <li className="border-2" onClick={() => handleDisplaySort('Ascending')}><a>Ascending</a></li>
        //                     <li className="border-2" onClick={() => handleDisplaySort('Descending')}><a>Descending</a></li>
        //                 </ul>
        //             </details>
        //         </div>
        //         {/* dropdown and icon */}
        //     </div>

        //     {/* form */}
        //     <div className="mb-20">
        //         <div className='flex flex-col mt-6'>
        //             <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
        //                 <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
        //                     <div className='overflow-hidden border border-gray-200  md:rounded-lg'>
        //                         <table className='min-w-full divide-y divide-gray-200'>
        //                             <thead className='bg-gray-50 text-lg font-bold'>
        //                                 <tr>
        //                                     <th
        //                                         scope='col'
        //                                         className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
        //                                     >
        //                                         <span className="text-lg font-bold">Si No</span>
        //                                     </th>
        //                                     <th
        //                                         scope='col'
        //                                         className='py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500'
        //                                     >
        //                                         <div className='flex items-center gap-x-3'>
        //                                             <span className="text-lg font-bold">Name</span>
        //                                         </div>
        //                                     </th>

        //                                     <th
        //                                         scope='col'
        //                                         className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
        //                                     >
        //                                         <span className="text-lg font-bold">Generic Name</span>
        //                                     </th>



        //                                     <th
        //                                         scope='col'
        //                                         className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
        //                                     >
        //                                         <span className="text-lg font-bold">Category</span>
        //                                     </th>

        //                                     <th
        //                                         scope='col'
        //                                         className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
        //                                     >
        //                                         <span className="text-lg font-bold">Mass Unit</span>
        //                                     </th>
        //                                     <th
        //                                         scope='col'
        //                                         className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
        //                                     >
        //                                         <span className="text-lg font-bold">Per Unit Price</span>
        //                                     </th>
        //                                     <th
        //                                         scope='col'
        //                                         className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
        //                                     >
        //                                         <span className="text-lg font-bold">Discount Percentage</span>
        //                                     </th>

        //                                     <th className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'>
        //                                         <span className="text-lg font-bold">Action</span>
        //                                     </th>
        //                                 </tr>
        //                             </thead>
        //                             {
        //                                 medicines?.map((requestItem, index) =>
        //                                     <AllCategoryMedicinesCard requestItem={requestItem} index={index} key={requestItem._id}></AllCategoryMedicinesCard>
        //                                 )
        //                             }
        //                         </table>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>

        //     </div>
        // </div>

        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Category Medicines</title>
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

                            <li onClick={() => handleDisplaySort('Ascending')}><a>Ascending</a></li>
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
                        data-aos-duration="1000" className="text-3xl font-bold rounded-2xl text-center uppercase  py-8 mt-6 mb-2 ">{category} Medicines Table
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
                            medicines?.map((requestItem, index) =>
                                <AllCategoryMedicinesCard requestItem={requestItem} index={index} key={requestItem._id}></AllCategoryMedicinesCard>
                            )
                        }



                    </table>
                </div>

            </div>
            {/* pagination */}
            {/* <div className="flex mb-10 justify-center items-center">
                {pageNumber}
            </div> */}
        </div>
    );
};

export default AllCategoryMedicine;