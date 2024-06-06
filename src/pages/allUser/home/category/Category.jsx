import  { useEffect, useState } from 'react';
import CategoryCard from './CategoryCard';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const Category = () => {
    const axiosSecure = useAxiosSecure();

    const { data: category = [], refetch } = useQuery({
        queryKey: ['category'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/allCategory`)
            return res.data;
        }
    })
    // const allCategory = allCategories.map(item => item.category);
    // console.log('category',allCategory);


    return (
        <div>
            <div className="container mx-auto">
                <div>
                    <p data-aos="fade-down"
                        data-aos-easing="ease-out-cubic"
                        data-aos-duration="1000" className="text-3xl font-bold rounded-2xl text-center bg-yellow-700 py-8 mt-6 mb-2 text-white"><span>SubCategory</span>Category name</p>
                </div>
                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 ">
                    {
                        category.map(item => <CategoryCard key={item._id}
                            item={item}></CategoryCard>)
                    }

                </div>

            </div>
        </div>
    );
};

export default Category;