//@ts-nocheck

import React, { useEffect } from 'react';
import { useUser } from './../context/user';

const Login = () => {
  const { login } = useUser();
  useEffect(login, []);

  return <div>Login</div>;
};

export default Login;
