// import React from 'react';

const Invoice = () => {
    const printInvoice = () => {
          window.print();
    };
    return (
        <div className=" bg-gray-100 p-6">
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                <div className="text-center mb-8">
                    <img src="your-logo-url.png" alt="Website Logo" className="mx-auto w-32" />
                    <h1 className="text-2xl font-bold mt-4">Invoice</h1>
                    <p>Date: <span>{new Date().toLocaleDateString()}</span></p>
                </div>
                <div className="mb-8">
                    <h2 className="text-xl font-bold border-b pb-2 mb-4">User Information</h2>
                    <p>John Doe</p>
                    <p>johndoe@example.com</p>
                    <p>1234 Elm Street, Some City, Some Country</p>
                </div>
                <div className="mb-8">
                    <h2 className="text-xl font-bold border-b pb-2 mb-4">Purchase Information</h2>
                    <table className="w-full border-collapse border border-gray-200">
                        <thead>
                            <tr>
                                <th className="border border-gray-200 p-2">Item</th>
                                <th className="border border-gray-200 p-2">Quantity</th>
                                <th className="border border-gray-200 p-2">Price</th>
                                <th className="border border-gray-200 p-2">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
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
                            </tr>
                        </tbody>
                    </table>
                    <p className="mt-4 text-right font-bold">Grand Total: $175.00</p>
                </div>
                <div className="text-center mt-8">
                    <p>Thank you for your purchase!</p>
                </div>
                <div className="text-center mt-8">
                    <button
                        onClick={printInvoice}
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                    >
                        Download as PDF
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Invoice;