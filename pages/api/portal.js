const stripe = require('stripe')(process.env.NEXT_STRIPE_SECRET_KEY);

const YOUR_DOMAIN = 'http://localhost:3000';

// updating the plan
const handler = async (req, res) => {
  const session = await stripe.billingPortal.sessions.create({
    customer: req.body.customer,
    return_url: `${YOUR_DOMAIN}/dashboard`,
  });

  res.send(session.url);
};

export default handler;
