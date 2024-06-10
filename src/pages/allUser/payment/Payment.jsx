import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

const Payment = () => {

    const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_PK);
    return (
        <div className="">
            <div className=''>
                <p className="text-3xl font-bold  text-center bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 py-12  text-white"></p>
            </div>


            <div className='mt-10'>
                <p data-aos="fade-down"
                    data-aos-easing="ease-out-cubic"
                    data-aos-duration="1000" className="text-3xl font-bold rounded-2xl text-center uppercase  py-8 mt-6 mb-2 "> Payment
                </p>
            </div>


            <div className="mb-10">
                <Elements stripe={stripePromise}>
                    <CheckoutForm/>
                </Elements>

            </div>

        </div>
    );
};
export default Payment;
