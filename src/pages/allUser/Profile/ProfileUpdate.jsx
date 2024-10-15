import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { HelmetProvider, Helmet } from "react-helmet-async"; // Use HelmetProvider and Helmet from react-helmet-async
import { AuthContext } from "../../../routes/authProvider/AuthProvider";
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const ProfileUpdate = () => {
    const { user } = useContext(AuthContext);
    const { register, handleSubmit, setValue } = useForm({
        defaultValues: {
            name: user.displayName || "", // Set the default value for name
            image: user.photoURL || "", // Set the default value for image
        },
    });
    const axiosPublic = useAxiosPublic(); // Make sure to import this hook
    const axiosSecure = useAxiosSecure(); // Make sure to import this hook



    const onSubmit = async (data) => { // Marked as async
        const { name = name, image = image } = data;
        const image_file = { image: data.image[0] };

        try {


            let updateUser = {
                image: image,
                name: name,
                email: user.email
            };
            console.log(updateUser)

            if (user.photoURL == image && name == user.displayName) {
                console.log("no update")
            }
            else if (name == user.displayName) {
                const res = await axiosPublic.post(image_hosting_api, image_file, {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                });
                const imageUrl = res.data.data.display_url;

                if (res.data.success) {

                    updateUser = {
                        image: imageUrl,
                        name: name,
                        email: user.email // Add the email property here
                    };

                    console.log("Updating user:", updateUser); // Log the data being sent

                    axiosPublic.post('/userUpdate', updateUser)
                        .then(res => {
                            console.log("Response:", res.data); // Log the server's response
                            if (res.data.updated) {
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
                                    title: res.data.message, // Use the server's message
                                    showConfirmButton: false,
                                    timer: 2500
                                });
                            }
                        })
                        .catch(err => {
                            console.error("Error updating profile:", err);
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
                    image: image,
                    name: name,
                    email: user.email // Add the email property here
                };

                console.log("Updating user:", updateUser); // Log the data being sent

                axiosPublic.post('/userUpdate', updateUser)
                    .then(res => {
                        console.log("Response:", res.data); // Log the server's response
                        if (res.data.updated) {
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
                                title: res.data.message, // Use the server's message
                                showConfirmButton: false,
                                timer: 2500
                            });
                        }
                    })
                    .catch(err => {
                        console.error("Error updating profile:", err);
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
            console.error("Error updating profile:", error);
            toast.error("Failed to update profile."); // Display error message
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
                        Hello, <span className="text-cyan-600">{user.displayName}</span>
                    </p>
                    <p className="mt-6 mb-12 font-medium">
                        Please update your profile
                    </p>
                    <img
                        src={user.photoURL ? user.photoURL : `https://i.ibb.co/qW320MT/images.jpg`}
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
                                    className="file-input file-input-bordered w-full "
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
