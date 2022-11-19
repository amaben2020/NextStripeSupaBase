import '../styles/globals.css';
import type { AppProps } from 'next/app';
import UserProvider from './../context/user';
import Nav from './../components/Nav';
import { useRouter } from 'next/router';
import { useState } from 'react';
function MyApp({ Component, pageProps }: AppProps) {
  const { session } = pageProps;
  const [sender, setSender] = useState('');
  const router = useRouter();

  const handleLogin = (e: any) => {
    e.preventDefault();
    router.push('/chat');
  };

  return (
    <UserProvider>
      <Nav />
      <Component
        handleLoginChange={(e: any) => setSender(e.target.value)}
        sender={sender}
        handleLogin={handleLogin}
        {...pageProps}
      />
    </UserProvider>
  );
}

export default MyApp;
