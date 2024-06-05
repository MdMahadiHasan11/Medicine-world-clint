import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

const Payment = () => {

    const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_PK);
    return (
        <div className="ml-10">
            <p>payment</p>
            <div className="mb-10">
                <Elements stripe={stripePromise}>
                    <CheckoutForm/>
                </Elements>

            </div>

        </div>
    );
};
export default Payment;
