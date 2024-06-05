import { Swiper, SwiperSlide } from 'swiper/react';
import { useQuery } from '@tanstack/react-query';
import 'swiper/css';
import 'swiper/css/bundle';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import useAxiosPublic from '../../../../hooks/useAxiosPublic';




const DiscountSlider = () => {

    const axiosPublic = useAxiosPublic()
    const { data: disMedicines = [], refetch } = useQuery({
        queryKey: ['disMedicines'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/disMedicines`)
            return res.data;
        }
    })
    console.log(disMedicines);




    return (
        <div>
            <div className=''>
                <div>
                    Discount Card title :{disMedicines.length}
                </div>
                <Swiper
                    slidesPerView={2}
                    spaceBetween={100}
                    // navigation={true}
                    centeredSlides={true}
                    pagination={
                        { clickable: true }
                    }

                    modules={[Pagination]}

                    loop={true}
                    // autoplay={
                    //     { delay: 3000 }
                    // }
                    className='mySwiper'
                >
                    {
                        disMedicines.map((item) => 
                            <SwiperSlide key={item._id}>

                               

                                <div className="card bg-base-100 shadow-xl image-full">
                                    <figure><img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
                                    <div className="card-body">
                                        <h2 className="card-title">Shoes!</h2>
                                        <p>If a dog chews shoes whose shoes does he choose?</p>
                                        <div className="card-actions justify-end">
                                            <button className="btn btn-primary">Buy Now</button>
                                        </div>
                                    </div>
                                </div>


                            </SwiperSlide>
                        )
                    }



                </Swiper>
            </div>
        </div>
    );
};
export default DiscountSlider;

