// import React from 'react';

import { Link } from "react-router-dom";

const CategoryCard = ({ item }) => {
    const { category, title, image, numMedicines, description,_id} = item;
    return (
        <div><Link to={`allCategoryMedicines/${category}`}>
            <div className="card card-compact bg-gray-100 border-cyan-700  shadow-xl">
                <figure><img src={image} className="max-h-[200px] w-full rounded-lg shadow-2xl" /></figure>
                <div className="card-body">
                    <h1 className="text-2xl card-title font-bold">{title}</h1>
                    <p className='text-lg font-bold'>Category Name: {category}</p>

                    <div className="card-actions text-lg font-semibold justify">
                        <p>No of medicines:{numMedicines}</p>
                    </div>
                    <div className="card-actions justify-end">

                        {/* <button className="btn btn-primary">Braces</button> */}

                    </div>
                </div>
            </div>
        </Link>
        </div>
    );
};

export default CategoryCard;