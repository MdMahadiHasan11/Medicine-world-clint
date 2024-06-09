import { NavLink, Outlet } from 'react-router-dom';
import { FaAd, FaHistory, FaHome } from 'react-icons/fa';
import { FaCartShopping, FaPersonRifle } from 'react-icons/fa6';
import useSeller from '../../hooks/useSeller';
import SellerDashboardRevenue from '../../pages/seller/dashboard/SellerDashboardRevenue';

const SellerDashboard = () => {
    const [isSeller] = useSeller();
    return (
        <div className="md:flex">
            <div className="md:w-64 md:min-h-screen bg-orange-400">
                <ul className="menu">
                    <li><NavLink to='/sellerDashboard/manageMedicines'> <FaCartShopping />Manage Medicines</NavLink></li>

                    <li><NavLink to='/sellerDashboard/paymentHistory'> <FaAd />Payment History</NavLink></li>

                    <li><NavLink to='/sellerDashboard/sellerAdvertisement'> <FaAd />Ask Advertisement</NavLink></li>

                    <div className="divider divider-error"></div>

                    <li><NavLink to='/'> <FaHome />Home</NavLink></li>
                </ul>


            </div>

            <div className="flex-1">
                <Outlet></Outlet>
                {/* <SellerDashboardRevenue></SellerDashboardRevenue> */}
            </div>

        </div>
    );
};

export default SellerDashboard;