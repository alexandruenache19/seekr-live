const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export default async function handler (req, res) {
  const account = await stripe.accounts.create({
    type: 'standard'
  })
  console.log('account', account.id)

  const accountLinks = await stripe.accountLinks.create({
    account: account.id,
    refresh_url: 'https://seekrlive.com/signup',
    return_url: 'https://seekrlive.com/signup',
    type: 'account_onboarding'
  })

  res.status(200).json({ url: accountLinks.url })
}
