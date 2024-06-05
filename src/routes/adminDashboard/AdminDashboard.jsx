
import useAdmin from '../../hooks/useAdmin';
import { NavLink, Outlet } from 'react-router-dom';
import { FaAd, FaHistory, FaHome } from 'react-icons/fa';
import { FaCartShopping, FaPersonRifle } from 'react-icons/fa6';

const AdminDashboard = () => {
    const [isAdmin] = useAdmin();
    return (
        <div className="flex">
            <div className="w-64 min-h-screen bg-orange-400">
                <ul className="menu">
                    <li><NavLink to='/adminDashboard/manageUsers'> <FaCartShopping />Manage Users</NavLink></li>

                    <li><NavLink to='/adminDashboard/adminManageCategory'> <FaAd />Manage Category</NavLink></li>

                    <li><NavLink to='/adminDashboard/paymentManagement'> <FaAd />Payment Management</NavLink></li>

                    <li><NavLink to='/adminDashboard/salesReport'><FaHistory />Sales Report</NavLink></li>

                    <li><NavLink to='/adminDashboard/manageBannerAdvertisement'> <FaHome />Manage Advertisement</NavLink></li>


                    <div className="divider divider-error"></div>
                    
                    <li><NavLink to='/'> <FaHome />Home</NavLink></li>
    


                </ul>


            </div>

            <div className="flex-1">
                <Outlet></Outlet>
            </div>

        </div>
    );
};

export default AdminDashboard;