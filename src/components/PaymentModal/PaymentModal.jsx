import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../CheckoutForm/CheckoutForm";
import PropTypes from 'prop-types';


const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
const PaymentModal = ({details}) => {
    return (
        <div>
            <Elements stripe={stripePromise}>
                <CheckoutForm details={details}></CheckoutForm>
            </Elements>
        </div>
    );
};

PaymentModal.propTypes = {
    details: PropTypes.object
}

export default PaymentModal;