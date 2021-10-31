const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const { sessionId } = req.body;

  const session = await stripe.checkout.sessions.retrieve(sessionId);
  res.status(200).json(session);
}
