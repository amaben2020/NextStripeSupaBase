import axios from 'axios';
import { useRouter } from 'next/router';
import { createContext, useState, useEffect, useContext } from 'react';
import { supabase, getServiceSupabase } from './../utils/client';

const Context = createContext();

const UserProvider = ({ children }) => {
  const { push } = useRouter();

  const [user, setUser] = useState(supabase.auth.getUser());

  const [isLoading, setIsLoading] = useState(true);

  //TODO: set cookie in header
  // pass supabase session cookie to API route to identify user
  // useEffect(() => {
  //   axios.post('/api/set-supabase-cookie', {
  //     event: user ? 'SIGNED_IN' : 'SIGNED_OUT',
  //     session: supabase.auth.getSession(),
  //   });
  // }, [user]);

  //TODO: understand setting headers in node

  // useEffect(() => {
  //   if (user) {
  //     const subscription = supabase
  //       .from(`profile:id=eq.${user.id}`)
  //       .on('UPDATE', (payload) => {
  //         setUser({ ...user, ...payload.new });
  //       })
  //       .subscribe();

  //     return () => {
  //       supabase.removeSubscription(subscription);
  //     };
  //   }
  // }, [user]);

  useEffect(() => {
    const getUserAndStripeProfile = async () => {
      const sessionUser = await supabase.auth.getUser();

      if (sessionUser) {
        const { data: profile } = await supabase
          .from('profile')
          .select('*')
          .eq('id', sessionUser.data.user?.id)
          .single();

        setUser({
          ...sessionUser,
          ...profile,
        });
        setIsLoading(false);
      }
    };

    getUserAndStripeProfile();

    //Receive a notification every time an auth event happens.
    supabase.auth.onAuthStateChange(() => {
      // whenever the auth state changes i.e login/logout, this function is called
      getUserAndStripeProfile();
    });
  }, []);

  const login = async () => {
    try {
      await supabase.auth.signInWithOAuth({
        provider: 'github',
      });
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    push('/login');
  };

  const exposed = { user, login, logout, isLoading };
  return <Context.Provider value={exposed}>{children}</Context.Provider>;
};

export const useUser = () => useContext(Context);

export default UserProvider;
