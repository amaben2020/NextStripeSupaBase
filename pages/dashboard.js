import React from 'react';
import { useUser } from '../context/user';
import { supabase } from '../utils/client';

const Dashboard = (props) => {
  const { user, isLoading } = useUser();
  console.log(user);
  console.log(props.user);
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

export const getServerSideProps = async ({ req }) => {
  const { data } = await supabase.auth.getUser();
  console.log('USER', data.user?.email);

  if (!data.user?.email) {
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
      props: {},
    };
  }

  return {
    props: {
      user: data.user,
    },
  };
};
