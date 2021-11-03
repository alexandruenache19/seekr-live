import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// loadStripe is initialized with a fake API key.
const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY);

export default function CustomCheckout({ sellerUsername }) {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "xl-tshirt" }] })
    })
      .then(res => res.json())
      .then(data => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: "night"
  };

  const options = {
    clientSecret,
    appearance
  };

  return (
    <div className="CustomCheckout">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm returnUrl={`https://seekrlive.com/${sellerUsername}`} />
        </Elements>
      )}
    </div>
  );
}
