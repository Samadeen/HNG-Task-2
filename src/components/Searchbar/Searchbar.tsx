import styles from './Searchbar.module.scss';
import search from '../../assets/Search.svg';
import { useContext } from 'react';
import { SearchContext } from '../../api/search-api';
import SearchCard from '../SearchCard/SearchCard';
import Roller from '../Roller/Roller';

const Searchbar = () => {
  const searchContext = useContext(SearchContext);

  if (!searchContext || !searchContext.defaultMovies) {
    return <div>Loading...</div>;
  }

  const { defaultMovies, query, setQuery, results, isLoading } = searchContext;

  return (
    <div className={styles.search}>
      <form action='' className={styles.searchBar}>
        <label htmlFor='search'>
          <input
            type='text'
            placeholder='What do you want to watch?'
            value={query || ''}
            onChange={(e) => setQuery(e.target.value)}
          />
          <img src={search} alt='search icon' />
        </label>
      </form>
      {(query?.length !== 0 || isLoading) && (
        <div className={styles.search_results}>
          {results.length > 0
            ? results.map((res, idx) => (
                <div key={idx} className={styles.search_res}>
                  {!isLoading ? (
                    <SearchCard
                      original_title={res.original_title}
                      overview={res.overview}
                      poster_path={res.poster_path}
                      release_date={res.release_date}
                      key={idx}
                      id={res.id}
                    />
                  ) : (
                    <Roller />
                  )}
                </div>
              ))
            : defaultMovies.map((res, idx) => (
                <div className={styles.checker} key={idx}>
                  {query!.length >= 1 ? (
                    <div className={styles.found}>
                      <h4 style={{ padding: '2rem' }}>No Movies Found</h4>
                    </div>
                  ) : (
                    <SearchCard
                      original_title={res.original_title}
                      overview={res.overview}
                      poster_path={res.poster_path}
                      release_date={res.release_date}
                      key={idx}
                      id={res.id}
                    />
                  )}
                </div>
              ))}
        </div>
      )}
    </div>
  );
};

export default Searchbar;
