const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export default async function handler (req, res) {
  const { quantity, price, name, imageUrl, productId, stripeSellerId } = req.body
  if (req.method === 'POST') {
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        shipping_address_collection: {
          allowed_countries: ['RO']
        },
        payment_intent_data: {
          on_behalf_of: stripeSellerId || 'acct_1JqIogR8NKnkhQia',
          application_fee_amount: parseFloat(price) * 4,
          transfer_data: {
            destination: stripeSellerId || 'acct_1JqIogR8NKnkhQia'
          }
        },
        line_items: [
          {
            price_data: {
              currency: 'ron',
              unit_amount: parseFloat(price) * 100,
              product_data: {
                name: name || 'For Sale',
                images: [imageUrl]
              }
            },
            quantity: 1
          }
        ],
        phone_number_collection: {
          enabled: true
        },
        mode: 'payment',
        // success_url: `${req.headers.referer}/?success=true&session_id={CHECKOUT_SESSION_ID}`,
        // cancel_url: `${req.headers.referer}/?canceled=true`,
        success_url: `https://seekrlive.com/p/${productId}/?success=true&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `https://seekrlive.com/p/${productId}/?canceled=true`
      })

      res.status(200).json({ url: session.url })
    } catch (err) {
      console.log('err.statusCode', err.statusCode, err.message)
      res.status(err.statusCode || 500).json(err.message)
    }
  } else {
    console.log('some other error')
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}
