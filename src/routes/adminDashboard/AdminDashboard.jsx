
import useAdmin from '../../hooks/useAdmin';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { FaAd, FaHistory, FaHome } from 'react-icons/fa';
import { FaAdversal, FaCartShopping, FaPersonRifle, FaUsersGear } from 'react-icons/fa6';
import useAuth from '../../hooks/useAuth';
import { TbCategoryFilled } from 'react-icons/tb';
import { MdPayment, MdPointOfSale } from 'react-icons/md';

const AdminDashboard = () => {
    const [isAdmin] = useAdmin();
    const { user } = useAuth();

    return (
        <div className="flex">
            <div className="w-64 min-h-screen bg-blue-400">
                <ul className="menu">
                    <li  className='mx-auto mb-5'><Link  to='/adminDashboard'>
                        <div className="avatar">
                            <div className="w-24 rounded-full">
                                <img src={user.photoURL} />
                            </div>
                        </div>


                    </Link></li>
                    <li><NavLink to='/adminDashboard/manageUsers'> <FaUsersGear />Manage Users</NavLink></li>

                    <li><NavLink to='/adminDashboard/adminManageCategory'> <TbCategoryFilled />Manage Category</NavLink></li>

                    <li><NavLink to='/adminDashboard/paymentManagement'> <MdPayment />Payment Management</NavLink></li>

                    <li><NavLink to='/adminDashboard/salesReport'><MdPointOfSale />Sales Report</NavLink></li>

                    <li><NavLink to='/adminDashboard/manageBannerAdvertisement'> <FaAdversal />Manage Advertisement</NavLink></li>


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