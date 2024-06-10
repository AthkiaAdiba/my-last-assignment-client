import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import PropTypes from 'prop-types';


const CheckoutForm = ({details, refetch}) => {
    const {pet_name, pet_image, _id} = details;

    const stripe = useStripe();
    const elements = useElements();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [donationAmount, setDonationAmount] = useState(0);
    const [clientSecret, setClientSecret] = useState('');
    const [error, setError] = useState('');
    const [transactionId, setTransactionId] = useState('');


    useEffect(() => {
        axiosSecure.post('/create-payment-intent', { donation: donationAmount })
            .then(res => {
                console.log(res.data.clientSecret)
                setClientSecret(res.data.clientSecret)
            })
    }, [axiosSecure, donationAmount])


    const handleSubmit = async (e) => {
        e.preventDefault();


        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement)

        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            console.log('payment error', error);
            setError(error.message);
        }
        else {
            console.log('payment method', paymentMethod);
            setError('')
        }


        // confirm payment
        const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })

        if(confirmError){
            console.log('confirm error')
        }
        else{
            console.log('payment intent', paymentIntent)
            if (paymentIntent.status === 'succeeded'){
                console.log('transaction id', paymentIntent.id)
                setTransactionId(paymentIntent.id);

                // save the donation in the database
                const donation = {
                    pet_name,
                    pet_image,
                    campaign_id: _id,
                    donationAmount,
                    user_name: user?.displayName,
                    email: user?.email
                }

                const res = await axiosSecure.post('/donations', donation)
                console.log('payment saved', res.data)

                // increase donated amount
                if(res.data.insertedId){
                    const donationRes = await axiosSecure.patch(`/donation-increase/${_id}`, {donationAmount})
                    refetch();
                    console.log(donationRes.data)
                }
            }
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-control mb-10">
                <label className="label">
                    <span className="label-text text-black text-xl font-medium">Enter Donation Amount</span>
                </label>
                <label className="input-group">
                    <input onBlur={(e) => setDonationAmount(e.target.value)} type="number" name="donationAmount" placeholder="Enter Donation Amount" className="input input-bordered w-full" required />
                </label>
            </div>
            <CardElement
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
            <button type="submit" disabled={!stripe || !clientSecret} className="btn bg-[#FF720F] text-white mt-6">Pay</button>
            <p className="text-red-600">{error}</p>
            {transactionId && <p className="text-green-400">Your trasaction id: {transactionId}</p>}
        </form>
    );
};

CheckoutForm.propTypes = {
    details: PropTypes.object,
    refetch: PropTypes.func
}

export default CheckoutForm;