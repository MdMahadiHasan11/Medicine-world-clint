
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
                element:<AllCategoryMedicine></AllCategoryMedicine>,
            },
            {
                path: "/card",
                element:<PrivateRoute><CardPage></CardPage></PrivateRoute>,
            },
        ]
    },
]);

export default Router;