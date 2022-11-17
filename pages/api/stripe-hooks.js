import initStripe from 'stripe';
import { buffer } from 'micro';
import { getServiceSupabase } from '../../utils/client';

export const config = { api: { bodyParser: false } };

const handler = async (req, res) => {
  console.log('event received');

  const stripe = initStripe(process.env.STRIPE_SECRET_KEY);

  const reqBuffer = await buffer(req);

  // getting the stripe signature
  const signature = req.headers['stripe-signature'];
  console.log('SIGNATURE', signature);

  // stripe secret is in dashboard under webhooks

  let evt;

  try {
    evt = stripe.webhooks.constructEvent(
      reqBuffer,
      signature,
      // process.env.STRIPE_SIGNING_SECRET
      'whsec_y1YVjPcZjs4g3uzrTAjRwUvi006X4hSd'
    );
  } catch (error) {
    console.log('ERROR', error);
    return res.status(400).send(error.message);
  }

  // updating user profile based on event type

  const supabase = getServiceSupabase();

  // updating subscription to true

  switch (evt.type) {
    case 'customer.subscription.created':
      await supabase
        .from('profile')
        .update({
          is_subscribed: true,
          interval: evt.data.object.items.data[0].plan.interval,
        })
        .eq('stripe_customer', evt.data.object.customer);
  }

  console.log('WEBHOOK EVENT', { evt });
  res.send({ received: true });
};

export default handler;
