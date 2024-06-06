import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageUserCard = ({ cardItem, userRefetch, index }) => {
    const axiosSecure = useAxiosSecure();
    const handleRole = async (_id, role) => {


        const roleInfo = {
            role: role
        }
        console.log(roleInfo)
        Swal.fire({
            title: `Are you sure make ${role}?`,
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/user/admin/${_id}`, roleInfo)
                    .then(res => {
                        if (res.data.modifiedCount) {
                            Swal.fire({
                                title: `${role}`,
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            userRefetch();
                        }
                    })
            }
        });
        // 


    }


    return (
        <tbody>
            {/* row */}

            <tr className="hover">
                <th>{index + 1}</th>
                <td>
                    <div className="avatar">
                        <div className="w-20 rounded-full">
                            <img src={cardItem.image} />
                        </div>
                    </div>
                </td>
                <td>{cardItem.name}</td>
                <th>{cardItem.email}</th>
                <th>{cardItem.role}</th>
                <th>
                    {
                        cardItem.role === 'user' ?
                            <>
                                <button onClick={() => handleRole(cardItem._id, 'admin')} > Make Admin</button>

                                <button onClick={() => handleRole(cardItem._id, 'seller')} > Make Seller</button>
                            </>
                            :

                            cardItem.role === 'seller'
                                ?
                                <button onClick={() => handleRole(cardItem._id, 'user')} > Make User</button>
                                :
                                ''


                    }


                </th>
            </tr>
            {/* row 3 */}

        </tbody>
    );
};

export default ManageUserCard;