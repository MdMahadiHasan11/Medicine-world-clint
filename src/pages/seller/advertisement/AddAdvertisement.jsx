import { useRef } from 'react';
import useAuth from '../../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';




const image_hosting_key = import.meta.env.VITE_IMAGE_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`


const AddAdvertisement = ({ onClose, sellerBannerRefetch }) => {
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();

    const navigate = useNavigate();

    // modal set up
    const modalRef = useRef();
    const closeModel = (e) => {
        if (modalRef.current === e.target) {
            onClose();
        }
    }
    // 


    // form set
    const { user } = useAuth();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        const { bannerHeader, description, image } = data;

        const image_file = { image: data.image[0] }

        const res = await axiosPublic.post(image_hosting_api, image_file,
            {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })

        const imageUrl = res.data.data.display_url


        if (res.data.success) {

            const bannerInfo =
            {
                email: user.email,
                bannerHeader: bannerHeader,
                description: description,
                status: 'notActive',
                image: imageUrl
            }

            axiosSecure.post('/allBanner', bannerInfo)
            .then(res => {
                if (res.data.insertedId) {
                    sellerBannerRefetch();
                    Swal.fire({
                        position: "top-center",
                        icon: "success",
                        title: "Successfully appointment",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    // navigate('/sellerDashboard/sellerAdvertisement');
                    onClose();
                }
            })                     

        }
    }
    return (
        <div ref={modalRef} onClick={closeModel} className='fixed inset-0 max-w-screen-xl mx-auto bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>
            <div>
                <button onClick={onClose} className='btn py-2 px-4 place-self-end'>X</button>
                <div className=' rounded-lg flex flex-col  items-center mx-4 '>
                    {/*  */}
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-row justify-center items-center gap-5  w-full p-2 md:px-6 md:pt-6 mx-auto bg-white  shadow-2xl">


                        <div className=" py-5 first-col">
                            <div className="text-center space-y-5 lg:text-left">

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Banner Header</span>
                                    </label>
                                    <input type="text" name="bannerHeader" placeholder="Banner Header" className="input input-bordered" required {...register("bannerHeader", { required: true })} />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Banner Short Description</span>
                                    </label>
                                    <input type="text" name="description" placeholder="Short Description" className="input input-bordered" required {...register("description", { required: true })} />
                                </div>

                                {/* <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Status</span>
                                    </label>
                                    <input type="text" name="status" placeholder="Status" className="input input-bordered" required {...register("status", { required: true })} />
                                </div> */}

                                <div className="form-control">
                                    <label className="form-control w-full ">
                                        <div className="label">
                                            <span className="label-text">Banner Image</span>
                                        </div>
                                        <input {...register("image", { required: true })} type="file" className="file-input file-input-bordered w-full " />
                                    </label>
                                </div>
                                <div className="form-control ">
                                    <button className="btn btn-primary">Add Medicine</button>
                                </div>

                            </div>
                        </div>


                    </form>
                    {/*  */}
                </div>
            </div>

        </div >
    );
};

export default AddAdvertisement;