import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import useAppointment from "../../../hooks/useAppointment";
// import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCardItem from "../../../hooks/useCardItem";
import { useNavigate } from "react-router-dom";
import { FaBangladeshiTakaSign } from "react-icons/fa6";

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState('')
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const { user } = useAuth();
    const navigate = useNavigate();

    const axiosSecure = useAxiosSecure();
    const [refetch, allCardItem] = useCardItem();
    // console.log('item==', allCardItem)


    const totalPrice = allCardItem.reduce((total, medicine) => total + medicine.grandTotal, 0);
    const discountPrice = (allCardItem.reduce((total, medicine) => total + medicine.perUnitPrice, 0)) - totalPrice;

    // console.log('hooooooooooooooooooooo',totalPrice);


    useEffect(() => {
        if (totalPrice > 0) {

            axiosSecure.post('/create-payment-intent', { price: totalPrice })
                .then(res => {
                    // console.log(res.data.clientSecret)
                    setClientSecret(res.data.clientSecret);
                })
        }

    }, [axiosSecure, totalPrice])




    const handleSubmit = async (event) => {

        event.preventDefault();
        // console.log('total==', totalPrice)

        if (!stripe || !elements) {

            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });
        if (error) {
            setError(error.message);
        } else {
            setError('')
        }
        // confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })
        if (confirmError) {
            console.log('confirm error')
        }
        else {
            // console.log('payment intent', paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                // console.log('tranction id', paymentIntent.id)
                setTransactionId(paymentIntent.id);
                // console.log('kaj hoye gece')

                // save database payment history

                const payment = {
                    email: user.email,
                    discountPrice: discountPrice,
                    grandTotal: totalPrice,
                    transactionId: paymentIntent.id,
                    date: new Date(),
                    cardItemIds: allCardItem.map(item => item._id),
                    medicinesIds: allCardItem.map(item => item.medicineId),
                    quantityIds: allCardItem.map(item => item.quantity),

                    status: 'pending'

                }
                const res2 = await axiosSecure.post(`/payments/invoice/${user.email}`, allCardItem);
                const res = await axiosSecure.post('/payments', payment)
                console.log('payment save', res);
                refetch();
                if (res.data?.paymentResult?.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Payment Successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });

                    navigate('/invoice');

                }



            }
        }


    }
    return (
        <div>
            <div className='border-2 rounded-xl mb-10 bg-slate-300'>

                <p className='flex justify-center  items-center text-xl font-bold'>Total :  <FaBangladeshiTakaSign/> {totalPrice}</p>
                <p className='flex justify-center items-center text-xl font-bold'>Discount : - <FaBangladeshiTakaSign /> {(discountPrice).toFixed(2)}</p>
                <p className='flex justify-center items-center text-xl font-bold'>Grand ToTal :  <FaBangladeshiTakaSign />  {(totalPrice - discountPrice).toFixed(2)}</p>

            </div>
            {/* Stripe cart */}
            <div>
                <form className="w-2/3 mx-auto bottom-2  " onSubmit={handleSubmit}>
                    <CardElement className="text-green-500 border-2 border-black rounded-xl py-3 px-6"
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#424770',
                                    '::placeholder': {
                                        color: '#aab7c4',
                                    },
                                },
                                invalid: {
                                    color: '#9e2146',
                                },
                            },
                        }}
                    />
                    <div className=" flex justify-center items-center"><button className="btn btn-outline text-xl mt-5 px-5 font-semibold" type="submit" disabled={!stripe}>
                        Pay
                    </button></div>
                </form>
                <div>
                    <p className="text-red-500">
                        {error}
                    </p>
                    {/* {transactionId && <p className="text-green-600">Your Transaction id : {transactionId}</p>} */}
                </div>

            </div>
            {/* end */}

            <div>
                {/* {appointmentList.length} */}
                {/* price:{totalPrice} */}
            </div>

        </div>
    );
};

export default CheckoutForm;