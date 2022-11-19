import React, { useEffect } from 'react';
import { useUser } from '../context/user';
import { supabase } from '../utils/client';
import { useRouter } from 'next/router';

const Dashboard = (props) => {
  const { user, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, []);

  return (
    <div>
      {!isLoading && (
        <h1>
          {user?.is_subscribed ? `Subscribed: ${user.interval}` : 'Not sub'}
        </h1>
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
