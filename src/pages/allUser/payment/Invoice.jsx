// import React from 'react';

import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { toast } from "react-toastify";
import img from '../../../../public/image/logo1.png'
import useAuth from "../../../hooks/useAuth";
import { Helmet } from "react-helmet";
import useInvoice from "../../../hooks/useInvoice";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Invoice = () => {
    // const printInvoice = () => {
    //     window.print();
    // };

 const navigate = useNavigate();


    // 
    // 
    const componentPDF = useRef();
    const generatePDF = useReactToPrint({
        content: () => componentPDF.current,
        documentTitle: 'Sales Medicines',
        onAfterPrint: () => { toast.success('Download Successfully..!!', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        })
        navigate('/')}
    });
    const { user } = useAuth();
    // console.log('hasabbbbbbbbbb',user)
    const [invoices, invoiceRefetch] = useInvoice();
    console.log('card item invoice', invoices)


    const totalPrice = invoices.reduce((total, medicine) => total + medicine.grandTotal, 0);
    const discountPrice = (invoices.reduce((total, medicine) => total + medicine.perUnitPrice, 0)) - totalPrice;
    return (
        <div className=" bg-white">

            <Helmet>
                <meta charSet="utf-8" />
                <title>Invoice</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>

            <div className=''>
                <p className="text-3xl font-bold  text-center bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 py-12  text-white"></p>
            </div>


            {/* <div className='mt-10'>
                <p data-aos="fade-down"
                    data-aos-easing="ease-out-cubic"
                    data-aos-duration="1000" className="text-3xl font-bold rounded-2xl text-center uppercase  py-8 mt-6 mb-2 ">
                </p>
            </div> */}
            <div ref={componentPDF} className="w-full" >
                <div >
                    <div className="max-w-4xl mx-auto  p-6  ">
                        <div className="text-center mb-8">
                            <img src={img} alt="Website Logo" className="mx-auto w-32" />
                            <h1 className="text-2xl font-bold ">Medicines-World</h1>
                            <p>Date: <span>{new Date().toLocaleDateString()}</span></p>
                        </div>
                        <div className="mb-8">
                            <h2 className="text-xl font-bold border-b pb-2 mb-4">User Information</h2>
                            <p>{user.displayName}</p>
                            <p>{user.email}</p>
                            {/* <p>1234 Elm Street, Some City, Some Country</p> */}
                        </div>
                        <div className="mb-8">
                            <h2 className="text-xl font-bold border-b pb-2 mb-4">Purchase Information</h2>
                            <table className="w-full border-collapse border border-gray-200">
                                <thead>
                                    <tr>
                                        <th className="border border-gray-200 p-2">Item</th>
                                        <th className="border border-gray-200 p-2">Quantity</th>
                                        <th className="border text-center border-gray-200 p-2">Price<FaBangladeshiTakaSign /></th>
                                        <th className="border border-gray-200 p-2">Discount<FaBangladeshiTakaSign /></th>
                                        <th className="border border-gray-200 p-2">Total<FaBangladeshiTakaSign /></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        invoices?.map((invoice) =>

                                            <tr key={invoice._id}>
                                                <td className="border border-gray-200 p-2">{invoice.medicinesName}</td>
                                                <td className="border border-gray-200 p-2">{invoice.quantity}</td>
                                                <td className="border border-gray-200 p-2">{invoice.perUnitPrice}</td>
                                               
                                                
                                                <td className="border  border-gray-200 p-2">{(invoice.perUnitPrice - invoice.grandTotal).toFixed(2)}</td>
                                                <td className="border  border-gray-200 p-2">{invoice.grandTotal}</td>
                                            </tr>
                                        )
                                    }
                                    {/* <tr>
                                        <td className="border border-gray-200 p-2">Product 1</td>
                                        <td className="border border-gray-200 p-2">2</td>
                                        <td className="border border-gray-200 p-2">$50.00</td>
                                        <td className="border border-gray-200 p-2">$100.00</td>
                                    </tr>
                                    <tr>
                                        <td className="border border-gray-200 p-2">Product 2</td>
                                        <td className="border border-gray-200 p-2">1</td>
                                        <td className="border border-gray-200 p-2">$75.00</td>
                                        <td className="border border-gray-200 p-2">$75.00</td>
                                    </tr> */}
                                </tbody>
                            </table>
                            <p className="mt-4 flex justify-end items-center j font-bold">Grand Total: <FaBangladeshiTakaSign />{totalPrice}</p>
                        </div>
                        <div className="text-center mt-8">
                            <p>Thank you for your purchase!</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center items-center mb-20">
                <button className="btn btn-outline font-bold" onClick={generatePDF}>Download</button>
            </div>
        </div>
    );
};

export default Invoice;