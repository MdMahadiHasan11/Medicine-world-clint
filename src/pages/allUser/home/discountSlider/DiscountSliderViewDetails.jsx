import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { useLocation } from "react-router-dom";

const DiscountSliderViewDetails = () => {
    const location = useLocation();
    const { requestItem } = location.state || {}; // Destructure requestItem from location.state

    return (
        <div className="min-h-screen flex items-center cardStyle  justify-center border p-4">
            <div className="max-w-4xl w-full rounded-lg shadow-lg border flex flex-col lg:flex-row overflow-hidden">
                {/* Hero Image with Fixed Height */}
                <div className="lg:w-1/2 h-96"> {/* Fixed height for the image container */}
                    <img
                        className="w-full h-full object-cover" // Cover the container and maintain aspect ratio
                        src={requestItem.image}
                        alt={requestItem.medicinesName}
                    />
                </div>
                <div className="lg:w-1/2 p-6 flex flex-col justify-between">
                    <div className="flex flex-grow flex-col justify-start">
                        <div className=""> {/* Added margin to space the content */}
                            <div className="flex justify-between">
                                <div className="flex gap-2 items-center">
                                    <h2 className="font-bold md:text-3xl text-2xl requestItem">{requestItem.medicinesName}</h2>
                                    <sub className="">{requestItem.massUnit}</sub>
                                </div>
                            </div>
                            <p className="text-xl font-bold ">
                                <i>{requestItem.discountPercentage}% <span className=''>OFF</span></i>
                            </p>
                        </div>
                        <div className="lg:flex justify-between items-center">
                            <div className="flex items-center ">
                                <p className="flex justify-center items-center mr-2 text-lg">
                                    <FaBangladeshiTakaSign />
                                    <del className="">{requestItem.perUnitPrice}</del>
                                </p>
                                <p className="text-xl font-bold"><FaBangladeshiTakaSign /></p>
                                <p className="text-xl font-bold">{requestItem.grandTotal}</p>
                            </div>

                        </div>

                        <hr className="border-t  my-4" />
                        <p className="text-sm lg:text-md font-medium">{requestItem.description}</p>
                    </div>

                    <div className="flex justify-between text-xs lg:text-sm mt-4">
                        <p>Category: {requestItem.category}</p>
                        <p>Company: {requestItem.company}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DiscountSliderViewDetails;
