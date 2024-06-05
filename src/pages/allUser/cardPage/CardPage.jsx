import React, { useState } from 'react';
import useCardItem from '../../../hooks/useCardItem';
import { FaAngleDown, FaAngleUp, FaArrowRight } from 'react-icons/fa';
import Swal from 'sweetalert2';
import Card from './Card';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { Link } from 'react-router-dom';

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

    return (
        <div>


            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead className='bg-slate-100'>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Company</th>
                            <th>Price</th>
                            <th>Discount</th>
                            <th>Quantity</th>
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
                <div className='flex flex-1 justify-end'>
                    <button onClick={handleDeleteAll} className="btn text-red-400 btn-active btn-link">Clear all Items</button>
                </div>
            </div>
            <div className='flex flex-1 justify-center' >
                <Link to='/payment'>
                    <button className="btn btn-outline btn-warning">Check out <FaArrowRight /></button>
                </Link>
            </div>
        </div>
    );
};

export default CardPage;