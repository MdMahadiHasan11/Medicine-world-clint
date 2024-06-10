import { useRef } from "react";
import useAuth from "../../../hooks/useAuth";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";



const image_hosting_key = import.meta.env.VITE_IMAGE_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const ManageCategoryModal = ({ onClose, categoryRefetch }) => {

    // modal
    const modalRef = useRef();
    const closeModel = (e) => {
        if (modalRef.current === e.target) {
            onClose();
        }
    }
    // handle start
    const { user } = useAuth();
    const axiosPublic=useAxiosPublic();
    const axiosSecure=useAxiosSecure();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        const { categoryName, categoryTitle, description, image} = data;
        const image_file = { image: data.image[0] }

        const res = await axiosPublic.post(image_hosting_api, image_file,
            {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
        const imageUrl = res.data.data.display_url
        if (res.data.success) {
            const categoryInfo =
            {
                email: user.email,
                category: categoryName,
                title: categoryTitle,  
                description : description,     
                image: imageUrl,
                numMedicines : 0 
            }

            axiosSecure.post('/admin/allCategory', categoryInfo)
                .then(res => {
                    if (res.data.insertedId) {
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
    // handle end


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
                                        <input type="text" name="categoryName" placeholder="Category Name" className="input input-bordered" required {...register("categoryName", { required: true })} />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Category Title</span>
                                        </label>
                                        <input type="text" name="categoryTitle" placeholder="Category Title" className="input input-bordered" required {...register("categoryTitle", { required: true })} />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Category Short Description</span>
                                        </label>
                                        <input type="text" name="description" placeholder="Category Short Description" className="input input-bordered" required {...register("description", { required: true })} />
                                    </div>
                                    <div className="form-control ">
                                        <label className="form-control w-full ">
                                            <div className="label">
                                                <span className="label-text">Image</span>
                                            </div>
                                            <input {...register("image", { required: true })} type="file" className="file-input file-input-bordered w-full " />
                                        </label>
                                    </div>

                                    <div className="form-control ">
                                        <button className="btn btn-primary">Add Category</button>
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

export default ManageCategoryModal;