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
        setSortMedicine(paidAllMedicineStat)
    }, [paidAllMedicineStat])

    // table
    const columns = [
        {
            name: 'Title',
            selector: row => row.medicinesName,
            sortable: true
        },
        {
            name: 'Year',
            selector: row => row.revenue,
            sortable: true
        },
        {
            name: 'Date',
            selector: row => (new Date(row.date)).toLocaleDateString(),
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


    return (
        <div>
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
            <div className="flex justify-between">
                <p>Total Paid :{paidAllMedicineStat?.reduce((total, item) => total + item.revenue, 0)}</p>
                <p>Total Pending :{pendingAllMedicineStat?.reduce((total, item) => total + item.revenue, 0)}</p>
            </div>
            {
                paidAllMedicineStat?.map((cardItem, index) =>
                    // <div key={cardItem.medicinesName} cardItem={cardItem} index={index} > <p>{cardItem.medicinesName}</p></div>
                    <div key={cardItem.medicinesName}>
                        <p className="flex gap-2">
                            <p>{index + 1}</p>
                            <p>{cardItem.medicinesName}</p>
                            <p>{cardItem.revenue}</p>
                        </p>
                    </div>
                )
            }
            {/*  */}
            <div ref={componentPDF} className="w-full" >
                <DataTable
                    columns={columns}
                    data={sortMedicine}
                    // expandableRows
                    // expandableRowsComponent={ExpandedComponent}
                    fixedHeader
                    pagination
                />
            </div>
            <div>
                <button className="btn btn-success" onClick={generatePDF}>Download</button>
            </div>
        </div>
    );
};

export default SalesReport;