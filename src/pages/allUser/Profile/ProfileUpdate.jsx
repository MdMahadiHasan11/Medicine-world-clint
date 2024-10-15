import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { HelmetProvider, Helmet } from "react-helmet-async";  // Use HelmetProvider and Helmet from react-helmet-async
import { AuthContext } from "../../../routes/authProvider/AuthProvider";
import 'react-toastify/dist/ReactToastify.css';

const ProfileUpdate = () => {
    const { user } = useContext(AuthContext);
    const { register, handleSubmit } = useForm();

    const updateUserProfile = (name, photoUrl) => {
        // Simulate the API call here
        return new Promise((resolve) => {
            setTimeout(() => resolve(), 1000); // Simulate async operation
        });
    };

    const onSubmit = (data) => {
        const { name = null, photoUrl = null } = data;

        if (!name && !photoUrl) {
            toast.success("Profile not updated");
        } else if (!name && photoUrl) {
            updateUserProfile(user.displayName, photoUrl).then(() => {
                toast.success("Successfully updated photo");
            });
        } else if (name && !photoUrl) {
            updateUserProfile(name, user.photoURL).then(() => {
                toast.success("Successfully updated name");
            });
        } else {
            updateUserProfile(name, photoUrl).then(() => {
                toast.success("Successfully updated profile");
            });
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
                            <label className="label">
                                <span className="label-text">Photo Url</span>
                            </label>
                            <input
                                type="text"
                                placeholder="photoUrl"
                                className="input input-bordered"
                                {...register("photoUrl", { required: false })}
                            />
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
