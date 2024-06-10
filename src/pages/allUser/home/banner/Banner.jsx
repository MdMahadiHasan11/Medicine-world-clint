import { Carousel } from "react-responsive-carousel";

import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const Banner = () => {
    // 
    // const { user } = useContext(AuthContext);

    const axiosPublic = useAxiosPublic();

    const { data: activeBanner = [], refetch: bannerRefetch } = useQuery({
        queryKey: ['activeBanner'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/active/banner`)
            return res.data;
        }
    })

    console.log(activeBanner);
    // 
    return (
        <Carousel autoPlay interval={3000} infiniteLoop>
            {/* <div>
                <img src="https://i.ibb.co/bPGTTBD/1708753498052.png" alt="Your Image" className="w-full max-h-[400px]" />
                <p className="legend">high tech</p>
            </div> */}
            {
                activeBanner.map((banner) => <div key={banner._id}>
                    <img src={banner.image} alt="Your Image" className="w-full max-h-[500px]" />
                    <p className="legend text-white text-xl font-bold">{banner.bannerHeader
                    }</p>
                    {/* <p className="carousel-caption">Our advanced formula provides quick relief from headaches, muscle aches, and joint pain. Feel better in minutes </p> */}
                </div>)
            }
        </Carousel>
    );
};

export default Banner;
