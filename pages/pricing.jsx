import initStripe from 'stripe';

import { useUser } from './../context/user';

import axios from 'axios';

const Pricing = ({ plans }) => {
  const { user, login, isLoading } = useUser();

  const processSubscription = async (plan) => {
    const { data } = await axios.get(`/api/subscription/${plan}`);

    console.log(data);
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
              {showSubsribeButton && (
                <button onClick={processSubscription(plan?.id)}>
                  {' '}
                  Subscribe
                </button>
              )}
              {showCreateAccountButton && (
                <button onClick={login}> Create Account</button>
              )}
              {showManageSubscriptionButton && (
                <button> Manage Subscription</button>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export const getStaticProps = async () => {
  const stripe = initStripe(process.env.STRIPE_SECRET_KEY);

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