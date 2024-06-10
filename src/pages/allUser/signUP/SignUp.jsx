import { useContext, useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { AuthContext } from "../../../routes/authProvider/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import { Fade } from "react-awesome-reveal";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Helmet } from "react-helmet";

const image_hosting_key = import.meta.env.VITE_IMAGE_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`
const SignUp = () => {

    const axiosPublic = useAxiosPublic();


    const [registerError, setRegisterError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPass, setShowPass] = useState(false);

    const { createUser, setUser, updateUserProfile } = useContext(AuthContext);


    const navigate = useNavigate();


    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        const { email, password, role, name, image } = data;
        // console.log(name, email, password, photoUrl)


        // password check
        if (password.length < 6) {
            setRegisterError('Password should be at least 6 characters or longer');
            toast.success("Password should be at least 6 characters or longer");
            return;
        }
        else if (!/[A-Z]/.test(password)) {
            setRegisterError('Your password have at least one uppercase character.')
            toast.success("Your password have at least one uppercase character.");
            return;
        }
        else if (!/[a-z]/.test(password)) {
            setRegisterError('')
            toast.success("Your password have at least one lowercase character.");
            return;
        }
        // register error reset
        setRegisterError('');
        setSuccess('');


        const image_file = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, image_file, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        if (res.data.success) {

            createUser(email, password)
                .then(() => {
                    const photoUrl =res.data.data.display_url;
                    updateUserProfile(name, photoUrl, role)
                        .then(() => {
                            // create user entry in the dataBase
                            const userInfo = {
                                name: name,
                                image:photoUrl,
                                email: email,
                                role: role,
                            }
                            axiosPublic.post('/user', userInfo)
                                .then(res => {
                                    if (res.data.insertedId) {
                                        Swal.fire({
                                            position: "top-center",
                                            icon: "success",
                                            title: "User create successfully",
                                            showConfirmButton: false,
                                            timer: 2500
                                        });
                                        navigate('/')
                                        //   window.location.reload();
                                    }
                                })
                        })
                })
                .catch(error => {
                    console.error(error);
                    setRegisterError(error.message);
                    toast.success("Fail to Register");
                })

        }


    }






    return (
        <div className="min-h-screen hero-overlay bg-opacity-60" style={{ backgroundImage: 'url(https://i.ibb.co/x6XV8X9/re.jpg)' }}>
            
            <Helmet>
                <meta charSet="utf-8" />
                <title>Sign Up</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            <div className=''>
                <p data-aos="fade-down"
                    data-aos-easing="ease-out-cubic"
                    data-aos-duration="1000" className="text-3xl font-bold  text-center bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 py-9 md:py-12  mb-2 text-white">
                </p>
            </div>


            <div className="mt-10 pb-10 justify-center items-center min-h-[calc(100vh-306px)] w-full">

                <div className=" p-2 md:p-6 mx-auto bg-white rounded-md w-1/2 shadow-2xl ">
                <p className="text-center text-4xl font-bold">Sign Up</p>
                    <div className="text-center lg:text-left">
                        {/* <div className="flex justify-center items-center">
                            <h1 className="text-5xl font-bold"><Fade>Register!</Fade></h1>
                        </div> */}

                        <form onSubmit={handleSubmit(onSubmit)} className="w-3/4 mx-auto">

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="name" name="name" placeholder="name" className="input input-bordered" required {...register("name", { required: true })} />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="email" className="input input-bordered" required {...register("email", { required: true })} />
                            </div>

                            <div className="form-control">
                                <label className="form-control w-full ">
                                    <div className="label">
                                        <span className="label-text">Image</span>
                                    </div>
                                    <input {...register("image", { required: true })} type="file" className="file-input file-input-bordered w-full " />
                                </label>
                            </div>

                            <div>
                                <label className="form-control w-full ">
                                    <div className="label">
                                        <span className="label-text">Role</span>
                                    </div>
                                    <select defaultValue="role" {...register("role", { required: true })} className="select select-bordered w-full ">
                                        <option disabled value="role" selected>Select the role</option>
                                        <option value="user">User</option>
                                        <option value="seller">Seller</option>
                                    </select>
                                </label>
                            </div>

                            <div className="form-control relative">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type={showPass ? "text" : "password"} name="password" placeholder="password" className="input input-bordered" required {...register("password", { required: true })} />

                                <span className="absolute right-2 bottom-12" onClick={() => setShowPass(!showPass)}>
                                    {
                                        showPass ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                                    }
                                </span>


                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Register</button>
                            </div>
                        </form>
                        <div className="flex justify-center items-center">
                            <p>All have an account ? <Link to="/login" className="text-blue-500 font-bold" >Login</Link></p>
                        </div>
                        <div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"

            />
        </div>
    );
};

export default SignUp;