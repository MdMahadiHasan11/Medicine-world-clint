import  { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../authProvider/AuthProvider';
import useSeller from '../../hooks/useSeller';


const SellerRoute = ({children}) => {
    const {user, logOut,loading}=useContext(AuthContext);
    const [isSeller,isSellerLoading] = useSeller();
    const location = useLocation();


    if (loading || isSellerLoading) {
        return <span className="loading  loading-spinner text-info flex justify-center items-center"></span>
    }
    if (user && isSeller) {
        return children;
    }
    return (
      logOut(),
        <Navigate state={location.pathname} to='/'></Navigate>
        
            

    );
};
export default SellerRoute;