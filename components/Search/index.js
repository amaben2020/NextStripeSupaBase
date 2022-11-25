// .components/Search/index.js

import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom';
import CustomHits from './CustomHits';
import CustomSearchBox from './CustomSearchBox';

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY
);

export default function Search() {
  return (
    <>
      <InstantSearch searchClient={searchClient} indexName='algomachine'>
        <CustomSearchBox />
        {/* <SearchBox/> */}
        <CustomHits />
        {/* <Hits/> */}
      </InstantSearch>
    </>
  );
}
