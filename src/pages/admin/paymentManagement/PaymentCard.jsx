
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const PaymentCard = ({ cardItem, paymentRefetch, index }) => {
    const axiosSecure = useAxiosSecure();
    const handleStatus = async (_id ) => {


        const statusInfo = {
            status: 'paid'
        }
        // console.log(statusInfo,_id)
        Swal.fire({
            title: `Are you sure make ${cardItem.status}?`,
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/admin/payment/${_id}`, statusInfo)
                    .then(res => {
                        if (res.data.modifiedCount) {
                            Swal.fire({
                                title: `${cardItem.status}`,
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            paymentRefetch();
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
                <td>{cardItem.email}</td>
                <th>{new Date(cardItem.date).toLocaleDateString()}</th>
                <th>{cardItem.discountPrice + cardItem.grandTotal }</th>
                <th>{(cardItem.discountPrice)?.toFixed(2)}</th>
                <th>{cardItem.grandTotal}</th>
                <th>{cardItem.status}</th>
                <th>
                    {
                        cardItem.status === 'pending' ?
                            <>
                                <button onClick={() => handleStatus(cardItem._id)} >Accept</button>
                            </>
                            :
                                ''


                    }


                </th>
            </tr>
            {/* row 3 */}

        </tbody>
    );
};

export default PaymentCard;