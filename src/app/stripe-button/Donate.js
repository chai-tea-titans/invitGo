import React from "react";
import { checkout } from "../../../checkout";
const Donate = () => {
  return (
    <button
      onClick={() => {
        checkout({
          lineItems: [
            {
              price: "price_1MmMG9DYc2zbExAbBHEVfoip",
              quantity: 1,
            },
          ],
        });
      }}
    >
      Donate
    </button>
  );
};

export default Donate;
