// import React from "react";
// import { checkout } from "../checkout";  // This
// const Donate = () => {
//   return (
//     <button
//       onClick={() => {
//         checkout({
//           lineItems: [
//             {
//               price: "price_1MmMG9DYc2zbExAbBHEVfoip",
//               quantity: 1,
//             },
//           ],
//         });
//       }}
//     >
//       Donate
//     </button>
//   );
// };

// export default Donate;


import { useState } from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';

// const stripePromise = loadStripe('YOUR_STRIPE_PUBLIC_KEY'); // Need stripe public key

const Payment = ({ expenseId, amount }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentType, setPaymentType] = useState('');

  const handlePayment = async (event) => {
    event.preventDefault();

    try {
      switch (paymentType) {
        case 'stripe':
          const stripe = await stripePromise;
          const response = await axios.post('/api/charge', {
            expenseId,
            amount,
            // stripeTokenId: // Stripe token for the payment ***********************
          });
          await stripe.redirectToCheckout({
            sessionId: response.data.checkoutSessionId
          });
          setPaymentSuccess(true);
          break;
        case 'venmo':
          // Handle Venmo payment
          setPaymentSuccess(true);
          break;
        case 'plaid':
          // Handle Plaid payment
          setPaymentSuccess(true);
          break;
        default:
          setErrorMessage('Please select a payment type');
      }
    } catch (error) {
      setErrorMessage('Payment failed');
    }
  };

  const handlePaymentTypeChange = (event) => {
    setPaymentType(event.target.value);
  };

  if (paymentSuccess) {
    return <div>Payment successful</div>;
  }

  return (
    <form onSubmit={handlePayment}>
      <label>
        Payment type
        <select value={paymentType} onChange={handlePaymentTypeChange}>
          <option value="">Select payment type</option>
          <option value="stripe">Stripe</option>
          <option value="venmo">Venmo</option>
          <option value="plaid">Plaid</option>
        </select>
      </label>

      {paymentType === 'stripe' && (
        <label>
          Card details        
          {/* <CardElement options={cardElementOptions} /> */}
        </label>
      )}

      <button type="submit">Pay</button>

      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
};

export default Payment;
