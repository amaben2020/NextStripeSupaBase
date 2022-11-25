// ./pages/blog/index.js

import Search from '../../components/Search';

// import ContentfulApi from './lib/ContentfulApi';
// import PostList from './components/PostList';

export default function BlogIndex({ data }) {
  return (
    <>
      <Search />

      {/* {JSON.stringify(data, null, 2)} */}
      {/* <PostList posts={posts} /> */}
    </>
  );
}

export async function getStaticProps() {
  // const posts = await ContentfulApi.getPostSummaries();

  const data = [
    {
      sys: { id: 'kjnacjasoiao9e9fj9evwjiooivrklrkv' },
      excerpt: 'lorem ipsum dolor sit amet, con',
      slug: 'algolia-search',
      title: 'Algolia search test v1',
      date: '2013-03-3',
      readingTime: 44,
      topicsCollection: {
        items: [],
      },
    },
  ];

  return {
    props: {
      data,
    },
  };
}
