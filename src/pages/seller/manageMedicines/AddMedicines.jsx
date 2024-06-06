import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';




const image_hosting_key = import.meta.env.VITE_IMAGE_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const AddMedicines = ({ onClose,userMedicineRefetch }) => {

    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();

    const { data: allCategories = [], refetch } = useQuery({
        queryKey: ['allCategories'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/allCategory`)
            return res.data;
        }
    })
    const allCategory = allCategories.map(item => item.category);
    console.log('category',allCategory);



    // modal set up
    const modalRef = useRef();
    const closeModel = (e) => {
        if (modalRef.current === e.target) {
            onClose();
        }
    }
    // 
    // 
    // 

    const { user } = useAuth();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        const { medicineName, genericName,image, company, description, category, massUnit, perUnitPrice, discountPercentage } = data;
        const image_file = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, image_file,
            {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            const imageUrl =res.data.data.display_url
        if (res.data.success) {
            // create user entry in the dataBase
            const medicineInfo =
            {
                email: user.email,
                medicinesName: medicineName, 
                genericName:genericName, 
                company:company, 
                description:description, 
                image:imageUrl, 
                category:category, 
                massUnit:massUnit + ' mg', 
                perUnitPrice:parseFloat(perUnitPrice), 
                discountPercentage:parseFloat(discountPercentage),
                grandTotal :parseFloat((perUnitPrice - ((perUnitPrice*discountPercentage)/100)).toFixed(2))
            }

            axiosSecure.post('/allMedicines', medicineInfo)
            .then(res => {
                if (res.data.insertedId) {
                    userMedicineRefetch();
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
                <div className=' rounded-lg flex flex-col gap-5 items-center mx-4 '>
                    {/*  */}
                    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto bg-white shadow-2xl ">
                        <div className="flex justify-center items-center gap-5  w-full p-2 md:px-6 md:pt-6 mx-auto bg-white  shadow-2xl ">

                            <div className=" ">
                                <div className="text-center lg:text-left">


                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Medicine Name</span>
                                        </label>
                                        <input type="text" name="medicineName" placeholder="medicine Name" className="input input-bordered" required {...register("medicineName", { required: true })} />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Generic Name</span>
                                        </label>
                                        <input type="text" name="genericName" placeholder="Generic Name" className="input input-bordered" required {...register("genericName", { required: true })} />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Company</span>
                                        </label>
                                        <input type="text" name="company" placeholder="company Name" className="input input-bordered" required {...register("company", { required: true })} />
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Short Description</span>
                                        </label>
                                        <input type="text" name="description" placeholder="short description" className="input input-bordered" required {...register("description", { required: true })} />
                                    </div>



                                    <div>
                                    </div>
                                </div>
                            </div>

                            <div className="  ">
                                <div className="text-center lg:text-left">

                                    <div>
                                        <label className="form-control w-full ">
                                            <div className="label">
                                                <span className="label-text">Category</span>
                                            </div>
                                            <select defaultValue="category" {...register("category", { required: true })} className="select select-bordered w-full ">
                                                <option disabled value="role" selected>Select the category</option>
                                                {
                                                    allCategories.map((item)=> <option key={item.id} value={item.category}>{item.category}</option>)
                                                }
                                                {/* <option value="user">User</option> */}
                                                {/* <option value="seller">Seller</option> */}
                                            </select>
                                        </label>
                                    </div>


                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Mass Unit</span>
                                        </label>
                                        <input type="text" name="massUnit" placeholder="Mass unit" className="input input-bordered" required {...register("massUnit", { required: true })} />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Per Unit Price</span>
                                        </label>
                                        <input type="number" name="perUnitPrice" placeholder="Per Unit Price" className="input input-bordered" required {...register("perUnitPrice", { required: true })} />
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Discount Percentage</span>
                                        </label>
                                        <input defaultValue={0} type="number" name="discountPercentage" placeholder="Discount Percentage %" className="input input-bordered" required {...register("discountPercentage", { required: true })} />
                                    </div>
                                    <div>
                                    </div>
                                </div>
                            </div>



                        </div>
                        <div className="form-control w-full p-2 md:px-6 md:pb-6  bg-white  shadow-2xl mx-auto ">
                            <label className="form-control w-full ">
                                <div className="label">
                                    <span className="label-text">Image</span>
                                </div>
                                <input {...register("image", { required: true })} type="file" className="file-input file-input-bordered w-full " />
                            </label>
                        </div>

                        <div className="form-control w-full md:py-4 p-2  mx-auto bg-white  shadow-2xl ">
                            <button className="btn btn-primary">Add Medicine</button>
                        </div>

                    </form>
                    {/*  */}
                </div>
            </div>

        </div >
    );
};

export default AddMedicines;