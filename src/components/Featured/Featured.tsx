import { useContext } from 'react';
import styles from './Featured.module.scss';
import { Link } from 'react-router-dom';
import { MovieContext } from '../../api/movie-api';
import Card from '../Card/Card';

const Featured = () => {
  const movieContext = useContext(MovieContext);

  if (!movieContext || !movieContext.movies) {
    return <div>Loading...</div>;
  }
  const movies = movieContext.movies;
  const firstTwelve = movies.slice(0, 10);

  return (
    <section className={styles.feature_container}>
      <div className={styles.heading}>
        <h2>Featured Movie</h2>
        <Link to='/feature'>See More </Link>
      </div>
      <div className={styles.movie_deck}>
        {firstTwelve.map((movie) => {
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
        })}
      </div>
    </section>
  );
};

export default Featured;
