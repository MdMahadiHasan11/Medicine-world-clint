import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useContext, useState } from "react";
import { AuthContext } from "../../../routes/authProvider/AuthProvider";
import MedicinesCard from "./MedicinesCard";
import AddMedicines from "./AddMedicines";

const ManageMedicines = () => {
    const { user } = useContext(AuthContext);

    const axiosSecure = useAxiosSecure();
    const { data: sellerMedicines = [], refetch : userMedicineRefetch } = useQuery({
        queryKey: ['sellerMedicines'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/sellerMedicines/${user.email}`)
            return res.data;
        }
    })
    console.log(sellerMedicines);

    const [modal, setModal] = useState(false)

    return (
        <div>
            <div>
                <div className="flex justify-center items-center my-6">
                    <button onClick={()=>setModal(true)} className="btn btn-outline btn-wide btn-warning">Add Medicines</button>
                </div>

                <div className="overflow-x-auto">
                    <table className="table">
                        <thead className='bg-slate-100'>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>GenericName</th>
                                <th>Category</th>
                                <th>Company</th>
                                <th>Price</th>
                                <th>Discount</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        {
                            sellerMedicines.map((cardItem, index) =>
                                <MedicinesCard key={cardItem._id} cardItem={cardItem} userMedicineRefetch={userMedicineRefetch}  index={index} ></MedicinesCard>
                            )
                        }



                    </table>
                </div>

            </div>
            <div>
                {modal && <AddMedicines userMedicineRefetch={userMedicineRefetch} onClose={()=>setModal(false)}></AddMedicines>}
            </div>


        </div>
    );
};

export default ManageMedicines;