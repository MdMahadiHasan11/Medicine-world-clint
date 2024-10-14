import { useContext } from 'react';
import CategoryCard from './CategoryCard';
import useCategoryMedicines from '../../../../hooks/useCategoryMedicines';
import { Helmet } from 'react-helmet';
import { ThemeContext } from '../../../../../ThemeContext'; // Ensure the path is correct

const Category = () => {
    const [category] = useCategoryMedicines();
    const { theme } = useContext(ThemeContext); // Access the current theme

    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Categories</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            <div className="">
                <div className='flex justify-center text-primary mx-auto items-center'>
                    <p 
                        data-aos="fade-down"
                        data-aos-easing="ease-out-cubic"
                        data-aos-duration="1000"
                        className={`navbar py-10 flex justify-center items-center mx-auto text-center font-extrabold text-3xl max-w-screen-xl`}>
                        Categories
                    </p>
                </div>
                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
                    {category.map(item => (
                        <CategoryCard key={item._id} item={item} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Category;
