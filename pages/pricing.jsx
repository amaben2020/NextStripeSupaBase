// import initStripe from 'stripe';
const Stripe = require('stripe');

import { useUser } from './../context/user';

import axios from 'axios';

// import { loadStripe } from '@stripe/stripe-js';
import { supabase } from '../utils/client';
import getStripe from '../utils/get-stripe';
import { useRouter } from 'next/router';

const Pricing = ({ plans }) => {
  const { user, login, isLoading } = useUser();
  const { push } = useRouter();

  const processSubscription = async (plan) => {
    // const { data } = await axios.get(`/api/subscription/${plan}`);
    const sessionInfo = supabase.auth.getSession();
    console.log('SESSION INFO', sessionInfo);
    console.log('PLAN ID', plan);

    // get the stripe customer
    const {
      data: { stripe_customer },
    } = await supabase
      .from('profile')
      .select('stripe_customer')
      .eq('id', user.id)
      .single();
    console.log('Customner', stripe_customer);

    const { data } = await axios.post(
      `/api/stripe/subscribe?cusId=${stripe_customer}`,
      { priceId: plan }
    );

    // console.log('DATA', data);

    push(data);

    // const id = (await sessionInfo).data.session.access_token;

    // const stripe = Stripe(process.env.NEXT_STRIPE_SECRET_KEY);

    // const lineItems = [
    //   {
    //     price: plan,
    //     quantity: 1,
    //   },
    // ];

    // await stripe.checkout.sessions.create({
    //   customer: stripe_customer,
    //   mode: 'subscription',
    //   payment_method_types: ['card'],
    //   line_items: lineItems,
    //   success_url: 'http://localhost:3000/payment/success',
    //   cancel_url: 'http://localhost:3000/payment/cancelled',
    // });

    // const loadStripe = getStripe();

    // const stripeRedirect = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

    // console.log('stripe redirect', stripeRedirect);

    // await stripeRedirect.redirectToCheckout({
    //   sessionId: id,
    // });
  };

  const showSubsribeButton = !!user && !user.is_subscribed;
  const showCreateAccountButton = !user;
  const showManageSubscriptionButton = user && user.is_subscribed;

  return (
    <div className='flex'>
      <pre>{JSON.stringify(plans, null, 2)}</pre>;
      {plans.map((plan, index) => (
        <div key={index} className='w-80 h-40 rounded shadow px-6 py-6 mx-6'>
          <h2>{plan.name}</h2>

          <p>
            ${plan.price} / {plan.interval}
          </p>

          {!isLoading && (
            <div>
              {showSubsribeButton && <button> Subscribe</button>}
              {showCreateAccountButton && (
                <button className='border-red-200 p-2 my-2' onClick={login}>
                  Create Account
                </button>
              )}
              {showManageSubscriptionButton && (
                <button
                  className='border p-2 my-2'
                  onClick={() => processSubscription(plan.id)}
                >
                  Manage Subscription
                </button>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export const getStaticProps = async () => {
  const stripe = Stripe(process.env.NEXT_STRIPE_SECRET_KEY);

  const { data: prices } = await stripe.prices.list();

  const plans = await Promise.all(
    prices.map(async (price) => {
      const product = await stripe.products.retrieve(price.product);

      return {
        id: price.id,
        name: product.name,
        price: price.unit_amount.toFixed(2),
        interval: price.recurring.interval,
        currency: price.currency,
      };
    })
  );

  const sortedPlans = plans.sort((a, b) => a.price - b.price);

  return {
    props: {
      prices,
      plans: sortedPlans,
    },
  };
};

export default Pricing;
