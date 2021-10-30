const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const { quantity, price } = req.body;
  if (req.method === "POST") {
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "eur",
              unit_amount: price,
              product_data: {
                name: "T-shirt"
              }
            },
            quantity: 1
          }
        ],
        phone_number_collection: {
          enabled: true
        },
        mode: "payment",
        success_url: `${req.headers.referer}/?success=true&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.referer}/?canceled=true`
      });

      res.redirect(303, session.url);
    } catch (err) {
      console.log("err.statusCode", err.statusCode, err.message);
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
