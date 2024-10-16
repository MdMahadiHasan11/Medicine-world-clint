import React from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { HelmetProvider, Helmet } from "react-helmet-async";
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useUserDetails from "../../../hooks/useUserDetails";

const image_hosting_key = import.meta.env.VITE_IMAGE_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const ProfileUpdate = () => {
    const { user } = useAuth();
    const { userInfo, refetch, isLoading, isError, error } = useUserDetails();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    
    const { register, handleSubmit, setValue } = useForm({
        defaultValues: {
            name: userInfo.name || "",
            image: userInfo.image || "",
        },
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (isError) {
        return <div>Error: {error.message}</div>;
    }

    const onSubmit = async (data) => {
        const { name = userInfo.name, image = userInfo.image } = data;
        const image_file = data.image[0];

        try {
            let updateUser = {
                image: image,
                name: name,
                email: user.email
            };
            console.log(updateUser)

            if ((!image && !name ) || (!image && name==userInfo.name )) {
                console.log("No update needed");
            } else if (image) {
                console.log("only name && image or must image ")
                const formData = new FormData();
                formData.append("image", image_file);

                const res = await axiosPublic.post(image_hosting_api, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                const imageUrl = res.data.data.display_url;

                console.log(imageUrl);

                if (res.data.success) {
                    updateUser = {
                        image: imageUrl,
                        name: userInfo.name,
                        email: user.email
                    };

                    console.log("only name && image or must image ");
                    console.log(updateUser);

                    axiosPublic.post('/user', updateUser)
                        .then(res => {
                            if (res.data.modifiedCount) {
                                Swal.fire({
                                    position: "top-center",
                                    icon: "success",
                                    title: "Update Profile Successfully",
                                    showConfirmButton: false,
                                    timer: 2500
                                });
                            } else {
                                Swal.fire({
                                    position: "top-center",
                                    icon: "error",
                                    title: res.data.message,
                                    showConfirmButton: false,
                                    timer: 2500
                                });
                            }
                        })
                        .catch(err => {
                            Swal.fire({
                                position: "top-center",
                                icon: "error",
                                title: "Update Profile Failed",
                                showConfirmButton: false,
                                timer: 2500
                            });
                        });
                }
            } else {
                updateUser = {
                    image: userInfo.image,
                    name: name,
                    email: user.email
                };

                console.log("only name ")
                console.log(updateUser)
                axiosPublic.post('/user', updateUser)
                    .then(res => {
                        if (res.data.modifiedCount) {
                            Swal.fire({
                                position: "top-center",
                                icon: "success",
                                title: "Update Profile Successfully",
                                showConfirmButton: false,
                                timer: 2500
                            });
                        } else {
                            Swal.fire({
                                position: "top-center",
                                icon: "error",
                                title: res.data.message,
                                showConfirmButton: false,
                                timer: 2500
                            });
                        }
                    })
                    .catch(err => {
                        Swal.fire({
                            position: "top-center",
                            icon: "error",
                            title: "Update Profile Failed",
                            showConfirmButton: false,
                            timer: 2500
                        });
                    });
            }
        } catch (error) {
            toast.error("Failed to update profile.");
        }
    };

    return (
        <HelmetProvider>
            <div>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Profile</title>
                </Helmet>

                <div className="flex flex-col justify-center items-center">
                    <p className="font-bold text-5xl">
                        Hello, <span className="text-cyan-600">{userInfo.name}</span>
                    </p>
                    <p className="mt-6 mb-12 font-medium">
                        Please update your profile
                    </p>
                    <img
                        src={userInfo.image || `https://i.ibb.co/qW320MT/images.jpg`}
                        className="rounded-full w-28 h-28"
                    />
                    <p className="font-bold my-2">{user.email}</p>
                </div>

                <div>
                    <form onSubmit={handleSubmit(onSubmit)} className="lg:w-1/2 md:w-3/4 mx-auto">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                type="text"
                                placeholder="name"
                                className="input input-bordered"
                                {...register("name", { required: false })}
                            />
                        </div>
                        <div className="form-control">
                            <label className="form-control w-full ">
                                <div className="label">
                                    <span className="label-text">Image</span>
                                </div>
                                <input
                                    {...register("image")}
                                    type="file"
                                    className="file-input file-input-bordered w-full"
                                />
                            </label>
                        </div>

                        <div className="form-control mt-6">
                            <button className="btn btn-primary" type="submit">
                                Update Profile
                            </button>
                        </div>
                    </form>
                </div>

                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
            </div>
        </HelmetProvider>
    );
};

export default ProfileUpdate;
