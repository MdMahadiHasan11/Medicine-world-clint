// import React from 'react';

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";


const image_hosting_key = import.meta.env.VITE_IMAGE_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const UpdateManageCategory = ({ cardItem, categoryRefetch, onClose }) => {
    

    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    // modal
    const modalRef = useRef();
    const closeModel = (e) => {
        if (modalRef.current === e.target) {
            onClose();
        }
    }

    //   handle update
    const { register, handleSubmit, formState: { errors } } = useForm();

    const { categoryName, categoryTitle, description, image, _id } = cardItem;

    const [img, setImage] = useState(image);



    const onSubmit = async (data) => {

        const { categoryName, categoryTitle, description, image, _id } = data;

        const image_file = { image: data.image[0] }

        console.log(data.image[0]);



        if (data.image[0]) {
            const res = await axiosPublic.post(image_hosting_api, image_file, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })

            const categoryInfo =
            {
                category: categoryName,
                title: categoryTitle,
                description: description,
                image: res.data.data.display_url
            }
            setImage(res.data.data.display_url)
            console.log('coteInfo',categoryInfo)
            

            const doctorRes = await axiosSecure.patch(`/admin/update/category/${cardItem._id}`, categoryInfo)
            console.log(doctorRes.data)
            if (doctorRes.data.modifiedCount) {

                setImage(res.data.data.display_url);
                categoryRefetch();
                Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: "Your work has been saved",
                    showConfirmButton: false,
                    timer: 1500
                });
                onClose();
            }


        }
        else {
            const categoryInfo =
            {
                category: categoryName,
                title: categoryTitle,
                description: description,
                image: img,
                
            }
            console.log('coteInfo outSite',categoryInfo)

            await axiosSecure.patch(`/admin/update/category/${cardItem._id}`, categoryInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    categoryRefetch();
                    Swal.fire({
                        position: "top-center",
                        icon: "success",
                        title: "Successfully Added Category",
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
                <div className=' rounded-lg flex flex-col gap-5 items-center mx-4 '>
                    {/*  */}
                    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto bg-white shadow-2xl ">
                        <div className="flex justify-center items-center gap-5  w-full p-2 md:px-6 md:pt-6 mx-auto bg-white  shadow-2xl ">
                            <div className=" ">
                                <div className="text-center lg:text-left">


                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Category Name</span>
                                        </label>
                                        <input defaultValue={cardItem.category} type="text" name="categoryName" placeholder="Category Name" className="input input-bordered" required {...register("categoryName", { required: true })} />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Category Title</span>
                                        </label>
                                        <input defaultValue={cardItem.title} type="text" name="categoryTitle" placeholder="Category Title" className="input input-bordered" required {...register("categoryTitle", { required: true })} />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Category Short Description</span>
                                        </label>
                                        <input defaultValue={cardItem.description} type="text" name="description" placeholder="Category Short Description" className="input input-bordered" required {...register("description", { required: true })} />
                                    </div>
                                    <div className="mt-4">
                                        <div className="avatar">
                                            <div className="w-24 rounded-xl">
                                                <img src={img} />
                                            </div>
                                        </div>

                                        <label className="form-control w-full ">
                                            <div className="label">
                                                <span className="label-text">Image</span>
                                            </div>
                                            <input  {...register("image")} type="file" className="file-input file-input-bordered w-full " />
                                        </label>
                                    </div>

                                    <div className="form-control ">
                                        <button className="btn btn-primary">Update Category</button>
                                    </div>




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

export default UpdateManageCategory;