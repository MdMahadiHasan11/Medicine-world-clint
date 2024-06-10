import { Link } from "react-router-dom";
import useAdmin from "../../../hooks/useAdmin";
import useSeller from "../../../hooks/useSeller";
import { useContext } from "react";
import { AuthContext } from "../../../routes/authProvider/AuthProvider";
import Banner from "./banner/Banner";
import Category from "./category/Category";
import DiscountSlider from "./discountSlider/DiscountSlider";

const Home = () => {
    const [isAdmin ]= useAdmin();
    const [isSeller] =useSeller();
    const {user} = useContext(AuthContext);
    return (
        <div>
            <Banner></Banner>
            <Category></Category>
            <DiscountSlider></DiscountSlider>
        </div>
    );
};

export default Home;