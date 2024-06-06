import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { AuthContext } from "../../../routes/authProvider/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import ManageCategoryCard from "./ManageCategoryCard";
import ManageCategoryModal from "./ManageCategoryModal";

const ManageCategory = () => {
    const { user } = useContext(AuthContext);

    const axiosSecure = useAxiosSecure();
    const { data: allCategory = [], refetch: categoryRefetch } = useQuery({
        queryKey: ['allCategory'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/admin/category`)
            return res.data;
        }
    })
    console.log(allCategory);
    const [modal, setModal] = useState(false)
    
    return (
        <div>
            <div className="flex justify-center items-center my-6">
                <button onClick={() => setModal(true)} className="btn btn-outline btn-wide btn-warning">Add Category</button>
            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead className='bg-slate-100'>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Category Name</th>
                            <th>Title</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {
                        allCategory.map((cardItem, index) =>
                            <ManageCategoryCard key={cardItem._id} cardItem={cardItem} categoryRefetch={categoryRefetch} index={index}></ManageCategoryCard>
                        )
                    }
                </table>
            </div>
            <div>
                {modal && <ManageCategoryModal categoryRefetch={categoryRefetch} onClose={()=>setModal(false)}></ManageCategoryModal>}
                
            </div>
        </div>
    );
};

export default ManageCategory;