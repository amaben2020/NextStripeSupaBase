import React, { useEffect } from 'react';
import { useUser } from './../context/user';

const LogOut = () => {
  const { logout } = useUser();

  useEffect(logout, []);

  return <div>LogOut</div>;
};

export default LogOut;
