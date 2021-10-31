const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY_DEVELOPMENT)

export default async function handler(req, res) {
  const { sessionId } = req.body
  console.log(sessionId)
  const session = await stripe.checkout.sessions.retrieve(sessionId)
  res.status(200).json(session)
}
