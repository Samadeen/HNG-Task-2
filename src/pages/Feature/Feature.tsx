import Header from '../../layout/Header/Header';
import styles from './Feature.module.scss';
import search from '../../assets/Search.svg';
import { useContext, useState } from 'react';
import { MovieContext } from '../../api/movie-api';
import Card from '../../components/Card/Card';
import Footer from '../../layout/Footer/Footer';
import { SearchContext } from '../../api/search-api';

const Feature = () => {
  const movieContext = useContext(MovieContext);
  const searchContext = useContext(SearchContext);
  const [searchValue, setSearchValue] = useState('');

  if (
    !searchContext ||
    !searchContext.defaultMovies ||
    (searchContext.query === null && searchContext.results === null)
  ) {
    return <div>Loading...</div>;
  }

  const { defaultMovies, results, searchMovies, setSearchMovies } =
    searchContext;

  console.log(results, defaultMovies);

  if (
    !movieContext ||
    !movieContext.movies ||
    !movieContext.searchMovies ||
    !movieContext.setSearchMovies
  ) {
    return <div>Loading....</div>;
  }
  // const { movies, searchMovies, setSearchMovies } = movieContext;

  const onSearchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);

    if (!value) {
      setSearchMovies(defaultMovies);
    } else {
      const filteredMovies = defaultMovies.filter((movie) => {
        return movie.title.toLowerCase().includes(value.toLowerCase());
      });
      setSearchMovies(filteredMovies);
    }
  };

  const imagePath = 'https://image.tmdb.org/t/p/original';

  return (
    <section className={styles.feature_container}>
      <div
        className={styles.head}
        style={{
          backgroundImage:
            searchMovies && searchMovies[0]
              ? `url(${imagePath + searchMovies[0].backdrop_path})`
              : `url(${imagePath + defaultMovies[0].backdrop_path})`,
        }}
      >
        <Header show={false} />
      </div>
      <form
        action=''
        className={styles.searchBar}
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <label>
          <input
            type='text'
            placeholder='What do you want to watch?'
            onChange={onSearchHandler}
            value={searchValue}
          />
          <img src={search} alt='search icon' />
        </label>

        <img src={search} alt='search icon' />
      </form>
      {searchMovies != null && searchMovies.length === 0 ? (
        <h2>Your Movie isn't here for now</h2>
      ) : (
        <div className={styles.movie_deck}>
          {searchMovies != null ? (
            searchMovies.map((movie) => {
              return (
                <Card
                  genre_ids={movie.genre_ids}
                  original_title={movie.original_title}
                  poster_path={movie.poster_path}
                  release_date={movie.release_date}
                  vote_average={movie.vote_average}
                  key={movie.id}
                  id={movie.imdb_id}
                />
              );
            })
          ) : (
            <h2>Loading...</h2>
          )}
        </div>
      )}

      <Footer />
    </section>
  );
};

export default Feature;
