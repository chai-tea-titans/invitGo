import React from 'react'

import {
 
    GooglePay,
    CreditCard,
    PaymentForm,
    ApplePay,
    Ach,
  } from "react-square-web-payments-sdk";

const Squearepayment = () => {
  return (
    <div className='container'>
    <PaymentForm
      applicationId="sandbox-sq0idb-lTs7Fp5EVfD0bRryQ-0cvg"
      cardTokenizeResponseReceived={async (token, verifiedBuyer) => {
        
        const response = await fetch("/api/pay", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            sourceId: token.token,
          }),
        });
        alert(JSON.stringify(await response.json(),null, 2))
        console.log(await response.json());
      }}
     createPaymentRequest={() => ({
        countryCode: "US",
        currencyCode: "USD",
        total: {
          amount: "1.00",
          label: "Total",
        },
      })}
      locationId="	LHFWB2DG17CTA" 
    >
      <p>payment card is 4111 1111 1111 1111 for testing</p>
      <GooglePay />
      <CreditCard
        buttonProps={{
          css: {
            backgroundColor: "#771520",
            fontSize: "14px",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#530f16",
            },
          },
        }}
      />
      <Ach
      accountHolderName='Delvis Soto' />
    </PaymentForm>
  </div>
  )
}

export default Squearepayment