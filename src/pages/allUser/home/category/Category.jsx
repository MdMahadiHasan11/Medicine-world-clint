import  { useEffect, useState } from 'react';
import CategoryCard from './CategoryCard';

const Category = () => {
    const [category, setCategory] = useState([]);
    useEffect(() => {
        fetch('category.json')
            .then(res => res.json())
            .then(data => setCategory(data))
    }, [])
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