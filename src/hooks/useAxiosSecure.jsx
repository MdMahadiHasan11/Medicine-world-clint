import axios from "axios";
import {  useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../routes/authProvider/AuthProvider";


// import React from 'react';
const axiosSecure = axios.create({
    baseURL: 'https://medicine-world-server.vercel.app'
})
const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { logOut } = useContext(AuthContext);
    // secure api
    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token');
        // console.log('request stopped in interceptor', token)

        config.headers.authorization = `Bearer ${token}`
        return config;
    }, function (error) {
        return Promise.reject(error);
    })
    axiosSecure.interceptors.response.use(function (response) {
        return response;
    }, async(error) => {

        const status = error.response.status;
        // console.log('status errorrrrrrrrr',status)
        if(status === 401 || status === 403){
            await logOut();
           navigate('/login')
        }
        return Promise.reject(error)
    })


    return axiosSecure;
};

export default useAxiosSecure;
