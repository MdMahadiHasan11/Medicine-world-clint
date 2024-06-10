import { Helmet } from "react-helmet";
import useSellerStat from "../../../hooks/useSellerStat";

const SellerDashboardRevenue = () => {
    const [paidMedicines, pendingMedicines,] = useSellerStat();


    // const totalPaid = paid?.reduce((total, medicine) => total + medicine.grandTotal, 0);
    const totalPaid = (paidMedicines && Array.isArray(paidMedicines)) ? paidMedicines.reduce((total, medicine) => total + medicine.revenue, 0) : 0;
    const totalPending = Array.isArray(pendingMedicines) ? pendingMedicines.reduce((total, medicine) => total + medicine.revenue, 0) : 0;

// console.log(paidMedicines, pendingMedicines);
    // const totalPending = pendingMedicines?.reduce((total, medicine) => total + medicine.grandTotal, 0);
    // const discountPrice = (invoices.reduce((total, medicine) => total + medicine.perUnitPrice, 0)) - totalPrice;

    return (
        // <div className="flex justify-between">
        //     <p>Total Paid :{paidMedicines?.items.reduce((total, item) => total + item.revenue, 0)}</p>
        //     <p>Total Pending :{pendingMedicines?.items.reduce((total, item) => total + item.revenue, 0)}</p>
        // </div>
        <div>

            <Helmet>
                <meta charSet="utf-8" />
                <title>Seller Dashboard</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            <div className="flex mt-52  justify-center">
                <div className="stats stats-vertical lg:stats-horizontal shadow">

                    <div className="stat">
                        <div className="stat-title">Total Revenue</div>
                        <div className="stat-value">{(totalPaid + totalPending).toFixed(2)}</div>
                        <div className="stat-desc">{new Date().toLocaleDateString()}</div>
                    </div>

                    <div className="stat">
                        <div className="stat-title">Total Paid</div>
                        <div className="stat-value">{(totalPaid)?.toFixed(2)}</div>
                        <div className="stat-desc">{new Date().toLocaleDateString()}</div>
                    </div>

                    <div className="stat">
                        <div className="stat-title">Total Pending</div>
                        <div className="stat-value">{(totalPending)?.toFixed(2)}</div>
                        <div className="stat-desc">{new Date().toLocaleDateString()}</div>
                    </div>

                </div>
            </div>
            {/*  */}

        </div>
    );
};

export default SellerDashboardRevenue;