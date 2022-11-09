import React from 'react';
import { supabase } from '../utils/client';

const LessonDetails = ({ data }) => {
  console.log(data);
  return (
    <div>
      <h1>{data?.name}</h1>
      <h1>{data?.description}</h1>
    </div>
  );
};

export default LessonDetails;

export const getStaticPaths = async () => {
  // get all the ids
  const { data } = await supabase.from('items').select('id');

  const paths = data?.map((elem) => ({ params: { id: elem.id.toString() } }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params: { id } }) => {
  console.log(id);
  const { data } = await supabase
    .from('items')
    .select('*')
    .eq('id', id)
    .single();

  return {
    props: {
      data,
    },
  };
};
