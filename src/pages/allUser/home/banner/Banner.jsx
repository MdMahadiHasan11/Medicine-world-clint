import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Carousel styles
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

// Inline styles for the carousel component
const styles = {
    carousel: {
        position: "relative",
        overflow: "hidden", // Ensures no overflow
        borderRadius: "10px", // Adds rounded corners to the entire carousel
    },
    image: {
        borderRadius: "10px",
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
        transition: "transform 0.5s ease", // Smooth transform effect on hover
    },
    legendContainer: {
        position: "absolute",
        bottom: "10%",
        left: "50%",
        transform: "translateX(-50%)", // Center horizontally
        color: "#ffffff",
        background: "rgba(0, 0, 0, 0.6)", // Slightly darker for contrast
        padding: "15px",
        borderRadius: "8px",
        fontSize: "1.5rem",
        fontWeight: "bold",
        textAlign: "center", // Center text inside the legend
        width: "90%", // Responsive width
        margin: "0 auto", // Center the legend container
    },
    carouselItem: {
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
};

const Banner = () => {
    const axiosPublic = useAxiosPublic();

    const { data: activeBanner = [] } = useQuery({
        queryKey: ['activeBanner'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/active/banner`);
            return res.data;
        }
    });

    return (
        <Carousel
            autoPlay
            interval={3000}
            infiniteLoop
            showArrows={false} // Hides arrows
            showStatus={false} // Hides status indicator
            showThumbs={false} // Hides thumbnail images
            style={styles.carousel} // Apply carousel styles
        >
            {activeBanner.map((banner) => (
                <div key={banner._id} style={styles.carouselItem}>
                    <img 
                        src={banner.image} 
                        alt="Banner Image" 
                        style={styles.image} 
                        className="w-full max-h-[500px] transition-transform hover:scale-105" // Scale effect on hover
                    />
                    <div style={styles.legendContainer}>
                        <p>{banner.bannerHeader}</p> {/* Centered legend text */}
                    </div>
                </div>
            ))}
        </Carousel>
    );
};

export default Banner;
