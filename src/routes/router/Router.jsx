
import {
    createBrowserRouter,
} from "react-router-dom";
import Root from "../root/Root";
import Home from "../../pages/allUser/home/Home";
import Login from "../../pages/allUser/login/Login";
import SignUp from "../../pages/allUser/signUP/SignUp";
import ErrorPageShow from "../../pages/errorPageShow/ErrorPageShow";
import MedicineShop from "../../pages/allUser/medicineShop/MedicineShop";
import CardPage from "../../pages/allUser/cardPage/CardPage";
import PrivateRoute from "../privateRoute/PrivateRoute";
import AllCategoryMedicine from "../../pages/allUser/allCategoryMedicines/AllCategoryMedicine";
import Payment from "../../pages/allUser/payment/Payment";
import Invoice from "../../pages/allUser/payment/Invoice";
import SellerDashboard from "../sellerDashboard/SellerDashboard";
import AdminDashboard from "../adminDashboard/AdminDashboard";
import ManageMedicines from "../../pages/seller/manageMedicines/ManageMedicines";
import SellerRoute from "../sellerRoute/SellerRoute";
import PaymentHistory from "../../pages/seller/paymentHistory/PaymentHistory";
import Advertisement from "../../pages/seller/advertisement/Advertisement";
import AdminRoute from "../adminRoute/AdminRoute";
import ManageUsers from "../../pages/admin/manageUser/ManageUsers";
import ManageCategory from "../../pages/admin/manageCategory/ManageCategory";
import PaymentManagement from "../../pages/admin/paymentManagement/PaymentManagement";
import SalesReport from "../../pages/admin/salesReport/SalesReport";
import ManageBanner from "../../pages/admin/manageBanner/ManageBanner";
import UserDashboard from "../userDashboard/UserDashboard";
import SellerDashboardRevenue from "../../pages/seller/dashboard/SellerDashboardRevenue";
import AdminRevenue from "../../pages/admin/revenue/AdminRevenue";
// import Shop from "../../pages/allUser/shop/Shop";




const Router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        errorElement: <ErrorPageShow></ErrorPageShow>,
        children: [
            {
                path: "/",
                element: <Home></Home>,
            },
            {
                path: "/login",
                element: <Login></Login>,
            },
            {
                path: "/signUp",
                element: <SignUp></SignUp>,
            },
            {
                path: "/shop",
                element: <MedicineShop></MedicineShop>,
            },
            {
                path: "/allCategoryMedicines/:category",
                element: <AllCategoryMedicine></AllCategoryMedicine>,
            },
            {
                path: "/card",
                element: <PrivateRoute><CardPage></CardPage></PrivateRoute>,
            },
            {
                path: "/payment",
                element: <PrivateRoute><Payment></Payment></PrivateRoute>,
            },
            {
                path: "/invoice",
                element: <PrivateRoute><Invoice></Invoice></PrivateRoute>,
            },
        ]
    },

    // seller

    {
        path: "/sellerDashboard",
        element: <PrivateRoute><SellerRoute><SellerDashboard></SellerDashboard></SellerRoute></PrivateRoute>,
        errorElement: <ErrorPageShow></ErrorPageShow>,
        children: [
            {
                path: "/sellerDashboard",
                element:<SellerRoute><SellerDashboardRevenue></SellerDashboardRevenue></SellerRoute> ,
            },
            {
                path: "manageMedicines",
                element: <SellerRoute><ManageMedicines></ManageMedicines></SellerRoute>,
            },
            {
                path: "paymentHistory",
                element: <SellerRoute><PaymentHistory></PaymentHistory></SellerRoute>,
            },
            {
                path: "sellerAdvertisement",
                element: <SellerRoute><Advertisement></Advertisement></SellerRoute>,
            },
            // {
            //     path: "updateDoctor/:id",
            //     element: <AdminRoute><UpdateDoctor></UpdateDoctor></AdminRoute>,
            //     loader: ({params}) => fetch(`https://medicine-world-server.vercel.app/allDoctor/${params.id}`)
            // },
        ]
    },

    // admin
    {
        path: "/adminDashboard",
        element: <PrivateRoute><AdminRoute><AdminDashboard> </AdminDashboard></AdminRoute></PrivateRoute>,
        errorElement: <ErrorPageShow></ErrorPageShow>,
        children: [
            {
                path: "/adminDashboard",
                element: <AdminRoute><AdminRevenue></AdminRevenue></AdminRoute>,
            },
            {
                path: "manageUsers",
                element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>,
            },
            {
                path: "adminManageCategory",
                element: <AdminRoute><ManageCategory></ManageCategory></AdminRoute>,
            },
            {
                path: "paymentManagement",
                element: <AdminRoute><PaymentManagement></PaymentManagement></AdminRoute>,
            },
            {
                path: "salesReport",
                element: <AdminRoute><SalesReport></SalesReport></AdminRoute>,
            },
            {
                path: "manageBannerAdvertisement",
                element: <AdminRoute><ManageBanner></ManageBanner></AdminRoute>,
            },


            // {
            //     path: "updateDoctor/:id",
            //     element: <AdminRoute><UpdateDoctor></UpdateDoctor></AdminRoute>,
            //     loader: ({params}) => fetch(`https://medicine-world-server.vercel.app/allDoctor/${params.id}`)
            // },
        ]
    },

    // user 
    {
        path: "/userDashboard",
        element: <PrivateRoute><UserDashboard> </UserDashboard></PrivateRoute>,
        errorElement: <ErrorPageShow></ErrorPageShow>,
        children: [
            // {
            //     path: "manageUsers",
            //     element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>,
            // },
        ]
    }


]);

export default Router;