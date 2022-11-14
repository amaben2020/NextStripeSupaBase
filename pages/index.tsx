//@ts-nocheck
import { createClient } from '@supabase/supabase-js';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from './../utils/client';
import { useUser } from './../context/user';
import axios from 'axios';

const Home: NextPage = ({ lessons }) => {
  const [name, setName] = useState('');

  const user = useUser();
  console.log('USER', { user });
  const controller = new AbortController();
  const info = async () => {
    const {
      data: { name },
    } = await axios.get('/api/hello', {
      signal: controller.signal,
    });

    setName(name);

    // controller.abort();
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
