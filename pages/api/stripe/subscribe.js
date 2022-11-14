const stripe = require('stripe')(process.env.NEXT_STRIPE_SECRET_KEY);

const YOUR_DOMAIN = 'http://localhost:3000';

const handler = async (req, res) => {
  const { cusId } = req.query;

  const session = await stripe.checkout.sessions.create({
    customer: cusId,
    line_items: [
      {
        price: req.body.priceId,
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url: `${YOUR_DOMAIN}/payment/success`,
    cancel_url: `${YOUR_DOMAIN}/payment/cancelled`,
  });

  res.send(session.url);
};

export default handler;
