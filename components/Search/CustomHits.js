// ./components/Search/CustomHits.js
import { connectStateResults } from 'react-instantsearch-dom';

function Hits({ searchState, searchResults }) {
  const validQuery = searchState.query?.length >= 3;

  console.log(searchState);

  return (
    <>
      {searchResults?.hits.length === 0 && validQuery && (
        <p>Aw snap! No search results were found.</p>
      )}
      {searchResults?.hits.length > 0 && validQuery && (
        <ol>
          {searchResults.hits.map((hit) => (
            <>
              <li key={hit.objectID}>{hit.title}</li>
              <li key={hit.objectID}>{hit.excerpt}</li>
            </>
          ))}
        </ol>
      )}
    </>
  );
}

export default connectStateResults(Hits);
