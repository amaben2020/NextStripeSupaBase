import Link from 'next/link';
import { useUser } from './../context/user';

const Nav = () => {
  const { user } = useUser();

  return (
    <nav className='flex py-4 px-6 border-b border-gray-200'>
      <Link href='/'>Home</Link>
      <Link className='ml-2' href='/pricing'>
        Pricing
      </Link>

      {!!user && (
        <Link className='ml-2' href='/dashboard'>
          Dashboard
        </Link>
      )}

      <div className='ml-auto'>
        <Link legacyBehavior href={user ? 'logout' : 'login'}>
          {user?.data?.user ? 'Logout' : 'Login'}
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
