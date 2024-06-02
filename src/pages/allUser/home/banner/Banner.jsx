import { Carousel } from "react-responsive-carousel";

import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

const Banner = () => {
    return (
        <Carousel>
            <div>
                <img src="https://i.ibb.co/bPGTTBD/1708753498052.png" alt="Your Image" className="w-full max-h-[400px]" />
                <p className="legend">Legend 1</p>
            </div>
            <div>
                <img src="https://i.ibb.co/QcB8N5Z/618fa90c201104b94458e1fb-64d4c62ef4a375d9ba140a1e-Behind-the-Scenes-of-High-Performing-React-Apps-An.jpg" alt="Your Image" className="w-full max-h-[400px]" />
                <p className="legend">Legend 2</p>
            </div>
            <div>
                <img src="https://i.ibb.co/TWdQkzH/which-development-job-is-right-for-you.jpg" alt="Your Image" className="w-full max-h-[400px]" />
                <p className="legend">Legend 3</p>
            </div>
            <div>
                <img src="https://i.ibb.co/s6gHF3w/mongodb-developers.jpg" alt="Your Image" className="w-full max-h-[400px]" />
                <p className="legend">Legend 1</p>
            </div>
        </Carousel>
    );
};

export default Banner;
