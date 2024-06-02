import { Link } from "react-router-dom";
import useAdmin from "../../../hooks/useAdmin";
import useSeller from "../../../hooks/useSeller";
import { useContext } from "react";
import { AuthContext } from "../../../routes/authProvider/AuthProvider";
import Banner from "./banner/Banner";
import Category from "./category/Category";

const Home = () => {
    const [isAdmin ]= useAdmin();
    const [isSeller] =useSeller();
    const {user} = useContext(AuthContext);
    return (
        <div>
            <Banner></Banner>
            <div className="my-10">Title:Category</div>
            <Category></Category>
            { isAdmin ? 'admin aseeeeeeeeee' : 'admin nai'}
            <div>{ isSeller ? 'Seller aseeeeeeeeee' : 'seller nai'}</div>
           <div> { user ? 'user name  ' +user.displayName : 'user nai'} </div>
        </div>
    );
};

export default Home;