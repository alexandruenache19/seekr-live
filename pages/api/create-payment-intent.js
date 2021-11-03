// This is a sample test API key.
const stripe = require("stripe")(
  "sk_test_51JqH7mJS5YvXoP5fFrT7swMVfhHemWiIKwp4Saxh2TiyBzX6bpT0ZobpzihUWZJbWyIR7aDmaGwIFUQinYe5B0rM00ilvMB45I"
);

export default async function handler(req, res) {
  const { item, sellerStripeId } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: parseFloat(item.ammount) * 100,
    currency: item.currency.toLowerCase(),
    application_fee_amount: parseFloat(item.ammount) * 4,
    transfer_data: {
      destination: sellerStripeId
    },
    payment_method_types: ["card"]
  });

  res.send({
    clientSecret: paymentIntent.client_secret
  });
}
