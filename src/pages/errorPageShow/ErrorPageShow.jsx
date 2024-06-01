import { Link } from "react-router-dom";

const ErrorPageShow = () => {
    return (
        <div>
            404 not found
           <Link to='/'><button className='btn btn-primary'>Back home</button></Link> 
        </div>
    );
};

export default ErrorPageShow;