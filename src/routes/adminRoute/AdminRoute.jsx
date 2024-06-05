import  { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../authProvider/AuthProvider';
import useAdmin from '../../hooks/useAdmin';

const AdminRoute = ({children}) => {
    const {user, logOut,loading}=useContext(AuthContext);
    const [isAdmin,isAdminLoading]=useAdmin();
    const location = useLocation();


    if (loading || isAdminLoading) {
        return <span className="loading  loading-spinner text-info flex justify-center items-center"></span>
    }
    if (user && isAdmin) {
        return children;
    }
    return (
      logOut(),
        <Navigate state={location.pathname} to='/'></Navigate>
        
            

    );
};

export default AdminRoute;
