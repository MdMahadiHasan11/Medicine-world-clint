import { Link } from "react-router-dom";
import useCategoryAllMedicines from "../../../../hooks/useCategoryAllMedicines";

const CategoryCard = ({ item }) => {
    const { category, title, image, numMedicines } = item;
    const [medicine, medicineRefetch] = useCategoryAllMedicines();

    return (
        <div className="transform transition-transform duration-300  hover:scale-105">
            <Link to={`allCategoryMedicines/${category}`}>
            <div className="hero cardStyle border rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out flex flex-row gap-4 p-6 max-w-lg"> 
                    {/* Image on the left */}
                    <div className="flex-shrink-0">
                        <img
                            src={image}
                            alt={title}
                            className="max-h-32 w-32 rounded-lg object-cover transition-opacity duration-300 hover:opacity-80"
                        />
                    </div>

                    {/* Text on the right */}
                    <div className="ml-4 flex-1">
                        {/* <h1 className="text-xl font-semibold mb-1 ">{title}</h1> */}
                        <h1 className="text-lg font-medium"><span className="">{category}</span></h1>
                        <div className="mt-2">
                            <p className=" font-medium">Total medicines: <span className="font-bold">{numMedicines}</span></p>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default CategoryCard;
