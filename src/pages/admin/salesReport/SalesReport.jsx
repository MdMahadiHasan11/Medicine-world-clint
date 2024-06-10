import DataTable from "react-data-table-component";
import useAdminStat from "../../../hooks/useAdminStat";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css';
import { useEffect, useRef, useState } from "react";
import { Calendar, DateRangePicker } from "react-date-range";
import { useReactToPrint } from "react-to-print";
import { ToastContainer, toast } from "react-toastify";
import { Helmet } from "react-helmet";

const SalesReport = () => {
    const [paidAllMedicineStat, pendingAllMedicineStat,] = useAdminStat();
    const [sortMedicine, setSortMedicine] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    useEffect(() => {
        const paid = Array.isArray(paidAllMedicineStat) ? paidAllMedicineStat : [];
        const pending = Array.isArray(pendingAllMedicineStat) ? pendingAllMedicineStat : [];
        setSortMedicine([...paid, ...pending]);
    }, [paidAllMedicineStat, pendingAllMedicineStat]);

    // table
    const columns = [
        {
            name: 'Name',
            selector: row => row.medicinesName,
            sortable: true
        },
        {
            name: 'Seller Email',
            selector: row => row.sellerEmail,
            sortable: true
        },
        {
            name: 'Buyer Email',
            selector: row => row.email,
            sortable: true
        },
        {
            name: 'Date',
            selector: row => (new Date(row.date)).toLocaleDateString(),
            sortable: true
        },
        {
            name: 'Grand Total',
            selector: row => row.revenue,
            sortable: true
        }
        
    ];


    // sort date range
    const handleSelect = (date) => {
        console.log(paidAllMedicineStat)
        let filtered = paidAllMedicineStat.filter((product) => {
            let productDate = new Date(product["date"]);
            return (
                productDate >= date.selection.startDate &&
                productDate <= date.selection.endDate
            );
        })
        console.log(filtered)
        setStartDate(date.selection.startDate);
        setEndDate(date.selection.endDate);
        setSortMedicine(filtered);
    }
    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: 'selection',
    }

    // 
    // 
    const componentPDF = useRef();
    const generatePDF = useReactToPrint({
        content: () => componentPDF.current,
        documentTitle: 'Sales Medicines',
        onAfterPrint: () => toast.success('Download Successfully..!!', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        })
    });
    console.log('paid',paidAllMedicineStat)

    // 
    // <div className="flex justify-between">
    //                 <p>Total Paid :{paidAllMedicineStat?.reduce((total, item) => total + item.revenue, 0)}</p>
    //                 <p>Total Pending :{pendingAllMedicineStat?.reduce((total, item) => total + item.revenue, 0)}</p>
    //             </div>
    // {
    //     paidAllMedicineStat?.map((cardItem, index) =>
    //         // <div key={cardItem.medicinesName} cardItem={cardItem} index={index} > <p>{cardItem.medicinesName}</p></div>
    //         <div key={cardItem.medicinesName}>
    //             <p className="flex gap-2">
    //                 <p>{index + 1}</p>
    //                 <p>{cardItem.medicinesName}</p>
    //                 <p>{cardItem.revenue}</p>
    //             </p>
    //         </div>
    //     )
    // }

    return (
        <div className="flex justify-center items-center text-lg">
            <div className="mt-10">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Sales Medicines</title>
                    <link rel="canonical" href="http://mysite.com/example" />
                </Helmet>
                <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"

                />

                <DateRangePicker
                    ranges={[selectionRange]}
                    onChange={handleSelect}
                />
                
                
                {/*  */}
                <div ref={componentPDF} className="w-full" >
                <p className="text-2xl font-bold mt-10 text-center">Medicines-World</p>
                    <p className="text-xl font-bold my-10 text-center">Sales Information</p>
                    
                    <DataTable
                        columns={columns}
                        data={sortMedicine}
                        // expandableRows
                        // expandableRowsComponent={ExpandedComponent}
                        fixedHeader
                        pagination
                    />
                </div>
                <div className="flex justify-center items-center my-10">
                    <button className="btn btn-outline" onClick={generatePDF}>Download</button>
                </div>
            </div>
        </div>
    );
};

export default SalesReport;