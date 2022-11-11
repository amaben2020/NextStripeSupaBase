import React, { useEffect } from 'react';
import { supabase } from './../utils/client';
import { useRouter } from 'next/router';

const LogOut = () => {
  const { push } = useRouter();
  useEffect(() => {
    const logout = async () => {
      await supabase.auth.signOut();
      push('/login');
    };
    logout();
  }, []);

  return <div>LogOut</div>;
};

export default LogOut;
