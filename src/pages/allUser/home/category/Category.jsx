import { useEffect, useState } from 'react';
import CategoryCard from './CategoryCard';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet';
import useCategoryMedicines from '../../../../hooks/useCategoryMedicines';

const Category = () => {

    const [category, categoryRefetch] = useCategoryMedicines();
    // const allCategory = allCategories.map(item => item.category);
    console.log('category', category);


    return (
        <div>

            <Helmet>
                <meta charSet="utf-8" />
                <title>Category Medicines</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            <div className="container  mx-auto">
                <div className='flex justify-center mb-10  mx-auto items-center'>
                    <p data-aos="fade-down "
                        data-aos-easing="ease-out-cubic"
                        data-aos-duration="1000" className="navbar flex justify-center   items-center mx-auto text-center font-extrabold text-3xl bg-opacity-50 bg-black max-w-screen-xl text-white"><span></span>Category Medicines</p>
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