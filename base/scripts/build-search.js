// build-search.js: https://www.contentful.com/blog/add-algolia-instantsearch-to-nextjs-app/

// Transforming your data for Algolia is as simple as creating an array of objects that contains the data you want to be searchable!

// dotenv allows us have access to the environment variables
const dotenv = require('dotenv');
const algoliasearch = require('algoliasearch/lite');

async function getAllBlogPosts() {
  // write your code to fetch your data
}

// transforming data for Algolia
function transformPostsToSearchObjects(posts) {
  const transformed = posts.map((post) => {
    return {
      objectID: post.sys.id,
      title: post.title,
      excerpt: post.excerpt,
      slug: post.slug,
      topicsCollection: { items: post.topicsCollection.items },
      date: post.date,
      readingTime: post.readingTime,
    };
  });

  return transformed;
}

// we're not triggering the function when we have an event, so we could just call it asap rather than invoking later

(async function () {
  dotenv.config();

  try {
    const posts = await getAllBlogPosts();
    const transformed = transformPostsToSearchObjects(posts);

    // initialize the client with your environment variables
    const client = algoliasearch(
      process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
      process.env.ALGOLIA_SEARCH_ADMIN_KEY
    );

    // initialize the index with your index name
    const index = client.initIndex('U0GPCIA4WP');

    // save the objects!
    const algoliaResponse = await index.saveObjects(transformed);

    // check the output of the response in the console
    console.log(
      `🎉 Sucessfully added ${
        algoliaResponse.objectIDs.length
      } records to Algolia search. Object IDs:\n${algoliaResponse.objectIDs.join(
        '\n'
      )}`
    );
  } catch (error) {
    console.log(error);
  }
})();
