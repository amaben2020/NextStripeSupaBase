import { loadStripe } from '@stripe/stripe-js';

// using the singleton pattern
//To make sure that you don't reinstate Stripe on every render, we recommend that you use the singleton pattern to create/retrieve the Stripe instance:

let stripePromise;
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);
  }
  return stripePromise;
};

export default getStripe;
