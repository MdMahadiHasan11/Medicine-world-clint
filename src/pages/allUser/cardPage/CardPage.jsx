import React, { useState } from 'react';
import useCardItem from '../../../hooks/useCardItem';
import { FaAngleDown, FaAngleUp, FaArrowRight } from 'react-icons/fa';
import Swal from 'sweetalert2';
import Card from './Card';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { FaBangladeshiTakaSign } from 'react-icons/fa6';

const CardPage = () => {
    const [refetch, allCardItem] = useCardItem();
    // const [medicinesName, perUnitPrice, discountPercentage, category, massUnit, company] = allCardItem;
    const axiosPublic = useAxiosPublic();
    // delete all
    const handleDeleteAll = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                const idsToDelete = allCardItem.map(cardItem => cardItem._id);
                axiosPublic.delete(`/allCardItem`, { data: { idsToDelete } })

                    .then(res => {
                        console.log(res.data)
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            refetch();
                        }
                    })

            }
        });
    }

    const totalPrice = allCardItem.reduce((total, medicine) => total + medicine.grandTotal, 0);
    const discountPrice = (allCardItem.reduce((total, medicine) => total + medicine.perUnitPrice, 0)) - totalPrice;

    return (
        <div className='mb-20'>

            <Helmet>
                <meta charSet="utf-8" />
                <title>Card Page</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>

            {
                !allCardItem.length ? <>
                    <div className=''>
                        <p className="text-3xl font-bold  text-center bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 py-12  text-white"></p>
                    </div>


                    <div className='mt-10'>
                        <p data-aos="fade-down"
                            data-aos-easing="ease-out-cubic"
                            data-aos-duration="1000" className="text-3xl font-bold rounded-2xl text-center uppercase  py-8 mt-6 mb-2 ">
                        </p>
                    </div>
                    <div className='flex mb-28 justify-center items-center'>
                        <p className='text-4xl mr-10 '>No Card Item</p>
                        <Link to='/'> <button className='btn btn-outline'>Back Home</button></Link>
                    </div>
                </> : <>


                    <div className=''>
                        <p className="text-3xl font-bold  text-center bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 py-12  text-white"></p>
                    </div>


                    <div className='mt-10'>
                        <p data-aos="fade-down"
                            data-aos-easing="ease-out-cubic"
                            data-aos-duration="1000" className="text-3xl font-bold rounded-2xl text-center uppercase  py-8 mt-6 mb-2 "> Card
                        </p>
                    </div>
                    {/* total */}
                    <div className='border-2 rounded-xl mb-10 bg-slate-300'>

                        <p className='flex justify-center  items-center text-xl font-bold'>Total :  <FaBangladeshiTakaSign /> {totalPrice}</p>
                        <p className='flex justify-center items-center text-xl font-bold'>Discount : - <FaBangladeshiTakaSign /> {(discountPrice).toFixed(2)}</p>
                        <p className='flex justify-center items-center text-xl font-bold'>Grand ToTal :  <FaBangladeshiTakaSign />  {(totalPrice - discountPrice).toFixed(2)}</p>

                    </div>
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead className='bg-slate-100'>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Company</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Discount</th>

                                    <th>Total</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            {
                                allCardItem.map((cardItem, index) =>
                                    <Card key={cardItem._id} cardItem={cardItem} index={index}></Card>
                                )
                            }



                        </table>
                        {allCardItem ? <><div className='flex flex-1 justify-end'>
                            <button onClick={handleDeleteAll} className="btn text-red-400 btn-active btn-link">Clear all Items</button>
                        </div></> : ''}

                    </div>
                    {
                        allCardItem.length ? <><div className='flex flex-1 justify-center' >
                            <Link to='/payment'>
                                <button className="btn btn-outline ">Check out <FaArrowRight /></button>
                            </Link>
                        </div></> : ''
                    }

                </>

            }



        </div>
    );
};

export default CardPage;