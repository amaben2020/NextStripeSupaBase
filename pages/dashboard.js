import React, { useEffect } from 'react';
import { useUser } from '../context/user';
import { supabase } from '../utils/client';
import { useRouter } from 'next/router';
import axios from 'axios';

const Dashboard = (props) => {
  const { user, isLoading } = useUser();
  console.log('user', user);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, []);

  const loadPortal = async () => {
    const { data } = await axios.post('/api/portal', {
      customer: user.stripe_customer,
    });

    console.log('DATA', data);
    router.push(data);
  };

  return (
    <div>
      {!isLoading && (
        <>
          <h1>
            {user?.is_subscribed ? `Subscribed: ${user.interval}` : 'Not sub'}
          </h1>
          <button onClick={loadPortal}> Manage Subscription </button>
        </>
      )}
    </div>
  );
};

export default Dashboard;

// export const getServerSideProps = async ({ req }) => {
//   const { data } = await supabase?.auth?.getUser();
//   console.log('USER', data.user?.email);

//   // if (!data.user?.email) {
//   //   return {
//   //     redirect: {
//   //       permanent: false,
//   //       destination: '/login',
//   //     },
//   //     props: {},
//   //   };
//   // }

//   return {
//     props: {
//       user: data.user,
//     },
//   };
// };
