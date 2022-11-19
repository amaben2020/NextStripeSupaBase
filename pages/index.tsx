//@ts-nocheck
import { createClient } from '@supabase/supabase-js';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from './../utils/client';
import { useUser } from './../context/user';
import axios from 'axios';
import io from 'Socket.IO-client';

const Home: NextPage = ({ lessons }) => {
  const [name, setName] = useState('');
  let socket;
  const user = useUser();

  const info = async () => {
    const {
      data: { name },
    } = await axios.get('/api/hello');

    setName(name);
  };

  useEffect(() => {
    info();
  }, []);

  return (
    <div className='flex min-h-screen flex-col items-center justify-center py-2'>
      {name}
      {user?.data?.user?.email}

      {lessons?.map((lesson) => (
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

  console.log(data);

  return { props: { lessons: data } };
};
