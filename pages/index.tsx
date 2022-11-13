//@ts-nocheck
import { createClient } from '@supabase/supabase-js';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from './../utils/client';
import { useUser } from './../context/user';

const Home: NextPage = ({ lessons }) => {
  const [name, setName] = useState('');

  const user = useUser();
  console.log('USER', { user });
  const info = async () => {
    const data = await fetch('/api/hello');
    const { name } = await data.json();
    setName(name);
  };

  useEffect(() => {
    info();
  }, []);

  return (
    <div className='flex min-h-screen flex-col items-center justify-center py-2'>
      {name}
      {/* {user.data.user.email} */}

      {lessons.map((lesson) => (
        <Link key={lesson.name} href={`/${lesson.id}`}>
          {lesson.name}
        </Link>
      ))}
    </div>
  );
};

export default Home;

export const getStaticProps = async () => {
  const { data } = await supabase.from('items').select('*');

  return { props: { lessons: data } };
};
