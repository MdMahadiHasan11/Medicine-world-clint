
import {
    createBrowserRouter,
} from "react-router-dom";
import Root from "../root/Root";
import Home from "../../pages/allUser/home/Home";
import Login from "../../pages/allUser/login/Login";
import SignUp from "../../pages/allUser/signUP/SignUp";
import ErrorPageShow from "../../pages/errorPageShow/ErrorPageShow";




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
            // {
            //     path: "/doctorProfile",
            //     element: <PrivateRoute><Profile></Profile></PrivateRoute>,
            // },
            // {
            //     path: "/appointment/:specialty",
            //     element:<Appointment></Appointment>,
            // },
        ]
    },
]);

export default Router;