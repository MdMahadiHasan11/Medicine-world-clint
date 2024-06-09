import useSellerStat from "../../../hooks/useSellerStat";

const SellerDashboardRevenue = () => {
    const [paidMedicines, pendingMedicines,] = useSellerStat();
    return (
        <div className="flex justify-between">
            <p>Total Paid :{paidMedicines?.items.reduce((total, item) => total + item.revenue, 0)}</p>
            <p>Total Pending :{pendingMedicines?.items.reduce((total, item) => total + item.revenue, 0)}</p>
        </div>
    );
};

export default SellerDashboardRevenue;