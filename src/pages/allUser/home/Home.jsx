import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div>
            this is home
           <Link to='/signUp'><button className="btn btn-primary">Sign Up</button></Link> 
           <Link to='/login'><button className="btn btn-primary">login</button></Link> 
        </div>
    );
};

export default Home;