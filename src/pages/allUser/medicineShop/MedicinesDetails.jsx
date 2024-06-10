import { useEffect, useRef } from "react";
import { FaBangladeshiTakaSign } from "react-icons/fa6";

const MedicinesDetails = ({ requestItem, onClose }) => {


    useEffect(() => {
        // Disable scrolling on mount
        document.body.style.overflow = "hidden";
        return () => {
            // Re-enable scrolling when component unmounts
            document.body.style.overflow = "auto";
        };
    }, []);
    // modal set up
    const modalRef = useRef();
    const closeModel = (e) => {
        if (modalRef.current === e.target) {
            onClose();
        }
    }
    return (
        <div ref={modalRef} onClick={closeModel} className='fixed z-50 inset-0 max-w-screen-xl mx-auto bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>
            <div>
                <button onClick={onClose} className='btn py-2 px-4 place-self-end'>X</button>
                <div className=' rounded-lg flex flex-col gap-5 items-center mx-4 '>
                    {/*  */}
                    <div className="card max-w-96    bg-base-100 shadow-xl">
                        <figure className="px-10 pt-10">
                            <img className="w-80 h-52" src={requestItem.image} />
                        </figure>
                        <div className=" card-body">
                            <div className="flex justify-between">
                                <div className="flex gap-2 items-center">
                                    <h2 className="font-bold text-3xl">{requestItem.medicinesName}</h2>
                                    <p>({requestItem.massUnit})</p>
                                </div>
                            </div>

                            <div className="flex justify-between items-center">
                                <p className="font-semibold py-0">{requestItem.genericName}</p>
                                <div className="flex justify-end items-center">
                                    <div className="flex justify-center items-center">

                                        <p className="text-xs  flex justify-center items-center">

                                            <span className="mr-2" >
                                                {requestItem.discountPercentage}%  Off
                                            </span >
                                            <p className="flex justify-center items-center mr-2"><FaBangladeshiTakaSign />
                                                <del >
                                                    {requestItem.perUnitPrice}
                                                </del>
                                            </p>

                                        </p>
                                    </div>

                                    <div className="flex justify-center items-center">
                                        <p className="text-xl font-bold"><FaBangladeshiTakaSign /></p>
                                        <p className="text-xl font-bold">{requestItem.grandTotal}</p>
                                    </div>
                                </div>
                            </div>
                            <hr className="border-t border-gray-300  my-2" />
                            <div className="flex font-semibold justify-between text-xs">
                                <p>Category: {requestItem.category}</p>
                                <p>Company: {requestItem.company}</p>
                            </div>
                            <p className="text-sm font-medium">{requestItem.description}</p>
                            <hr className="border-t border-gray-300  my-4" />
                        </div>
                    </div>
                    {/*  */}
                </div>
            </div>

        </div >
    );
};

export default MedicinesDetails;

