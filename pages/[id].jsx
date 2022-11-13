import { useEffect, useState } from 'react';
import { supabase } from '../utils/client';

const LessonDetails = ({ data }) => {
  const [videoUrl, setVideoUrl] = useState();

  const getPremiumContent = async () => {
    const { data } = await supabase
      .from('premium_content')
      .select('video_url')
      .eq('id', data?.id)
      .single();

    //access video url if we have data
    setVideoUrl(data?.video_url);
  };

  useEffect(() => {
    getPremiumContent();
  }, []);
  return (
    <div>
      <h1>{data?.name}</h1>
      <h1>{data?.description}</h1>
      <iframe
        width='560'
        height='315'
        src='https://www.youtube.com/embed/_j8KOS9X70U'
        title='YouTube video player'
        frameborder='0'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        allowfullscreen
      ></iframe>
      <p>{videoUrl}</p>
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
