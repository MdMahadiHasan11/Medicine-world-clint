
import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../routes/authProvider/AuthProvider";
import { CgProfile } from "react-icons/cg";
import { FaCartShopping, FaRegUser } from "react-icons/fa6";
import { Tooltip } from "react-tooltip";
import useCardItem from "../../hooks/useCardItem";
// import useAppointment from '../../hooks/useAppointment';
// import ReactLanguageSelect from 'react-languages-select';
// import LanguageSelect from 'react-languages-select';

// import 'react-languages-select/scss/react-languages-select.scss';
// //import css module
// import 'react-languages-select/css/react-languages-select.css';


import logo1 from '../../../public/image/logo1.png'
import { GrLanguage } from "react-icons/gr";
import useAdmin from "../../hooks/useAdmin";
import useSeller from "../../hooks/useSeller";
const Navbar = () => {

    const [isAdmin] = useAdmin();
    const [isSeller] = useSeller();

    const [refetch, allCardItem] = useCardItem();
    // console.log(allCardItem)
    const { user, logOut } = useContext(AuthContext);

    const handleSignOut = () => {
        logOut()
            .then()
            .catch()
    }
    // theme
    const [theme, setTheme] = useState(
        localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
    );
    const handleToggle = (e) => {
        if (e.target.checked) {
            setTheme("dark");
        }
        else {
            setTheme("light");
        }
    }

    useEffect(() => {
        localStorage.setItem("theme", theme);
        const localTheme = localStorage.getItem("theme");
        document.querySelector("html").setAttribute("data-theme", localTheme);
    }, [theme]);
    // toggle theme end

    const links = < >

        <li className="font-bold "><NavLink to="/">
            Home</NavLink>
        </li>
        <li className="font-bold"><NavLink to="/shop">
            Shop</NavLink>
        </li>
        <li className="font-bold">
            <NavLink to='card'>
                <FaCartShopping /><span>{allCardItem.length}</span>
            </NavLink>
        </li>




    </>

    // console.log(theme)
    // fixed
    return (
        <div className="navbar fixed z-10 bg-opacity-30 bg-black max-w-screen-xl text-white">
            <div className="navbar-start">
                {/* <div className="dropdown z-50">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-lg">
                        {links}
                    </ul>
                </div> */}
                {/* bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 */}
                <NavLink to="/" className="  flex  justify-center items-center  font-bold lg:text-3xl md:text-2xl">
                    <img className="md:w-24 w-16 md:h-20 h-14" src={logo1} alt="" />
                    <p className=''>Medicines-World</p>

                </NavLink>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 text-lg">
                    {links}
                </ul>
            </div>

            <div className="navbar-end ">
                {
                    user ?

                        // 
                        <div className="dropdown mr-4 dropdown-end">
                            {/* btn-ghost rounded-btn */}
                            <div tabIndex={0} role="button" className=" font-bold   text-lg ">
                                <div data-tooltip-id="my-tooltip" className=" relative group">
                                    <img src={user.photoURL ? user.photoURL : `https://i.ibb.co/qW320MT/images.jpg`} className="rounded-full w-10 h-10" />
                                </div>
                            </div>
                            <ul tabIndex={0} className={theme === 'dark' ? 'menu dropdown-content z-[10] p-2  shadow bg-base-300 rounded-box w-52 mt-4' : 'menu dropdown-content z-[10] p-2 text-black shadow bg-base-300 rounded-box w-52 mt-4'}>
                                {
                                    isAdmin ?
                                        <>
                                            <li className="font-bold"><NavLink to="/updateProfile">Update Profile</NavLink></li>
                                            <li className="font-bold"><NavLink to="/adminDashboard"> admin Dashboard</NavLink></li>
                                            <li className="font-bold">
                                                <button onClick={handleSignOut} className="">
                                                    Log Out
                                                </button>
                                            </li>
                                        </> :
                                        isSeller ?
                                            <>
                                                <li className="font-bold"><NavLink to="/updateProfile">Update Profile</NavLink></li>
                                                <li className="font-bold"><NavLink to="/sellerDashboard"> seller Dashboard</NavLink></li>
                                                <li className="font-bold"><button onClick={handleSignOut} className="">

                                                    Log Out
                                                </button></li>
                                            </> :
                                            <>
                                                <li className="font-bold"><NavLink to="/updateProfile">Update Profile</NavLink></li>
                                                <li className="font-bold"><NavLink to="/userDashboard"> User Dashboard</NavLink></li>
                                                <li className="font-bold"><button onClick={handleSignOut} className="">

                                                    Log Out
                                                </button></li>
                                            </>

                                }
                            </ul>
                        </div>

                        // 
                        : <span>
                            <button className="  px-5 md:mr-4 font-bold md:text-lg">
                                <NavLink to="/login">Join US</NavLink>
                            </button>
                            <button className=" font-bold md:mr-4 text-xl">
                                <NavLink to="/signUp"><FaRegUser /></NavLink>
                            </button>

                        </span>

                }

                {/* language */}
                <div className="dropdown">
                    <div tabIndex={0} role="button" className=" m-1 mx-2 text-2xl"><GrLanguage /></div>
                    <ul tabIndex={0} className={theme === 'dark' ? 'dropdown-content font-bold z-10 menu p-2 shadow bg-base-100 rounded-box w-24' : 'dropdown-content z-10 font-bold menu p-2 shadow text-black bg-base-100 mb-3 rounded-box w-24'}>
                        <li><a>English</a></li>
                        <li><a>Hindi</a></li>
                        <li><a>Bangla</a></li>
                    </ul>
                </div>
                {/* theme */}

                {/* <ReactLanguageSelect
                    searchable={true}
                    searchPlaceholder="Search for a language" /> */}
                <label className="swap mr-4 ml-2 swap-rotate">

                    {/* this hidden checkbox controls the state */}
                    <input type="checkbox"
                        onChange={handleToggle}
                        checked={theme === "light" ? false : true}

                    />

                    {/* sun icon */}
                    <svg className="swap-on fill-current w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>

                    {/* moon icon */}
                    <svg className="swap-off fill-current w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>

                </label>
                {/* theme end */}
            </div>
        </div >
    );
};

export default Navbar;
