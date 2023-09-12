import styles from './Movie.module.scss';
import tickets from '../../assets/Two Tickets.svg';
import list from '../../assets/List.svg';
import list_white from '../../assets/List-white.png';
import { useContext, useEffect, useState } from 'react';
import { MovieContext } from '../../api/movie-api';
import play from '../../assets/Play.svg';
import home from '../../assets/Home.svg';
import movie_icon from '../../assets/Movie Projector.svg';
import tv from '../../assets/TV Show.svg';
import calender from '../../assets/Calendar.svg';
import logo_black from '../../assets/Logo-black.svg';
import logout from '../../assets/Logout.svg';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

interface Movie {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: null;
  budget: number;
  genres: Genre[];
  homepage: string | null;
  id: number;
  imdb_id: string | null;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string | null;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface Genre {
  id: number;
  name: string;
}

interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

const Movie = () => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const movieContext = useContext(MovieContext);

  const { imdb_id } = useParams<{ imdb_id: string }>();

  console.log(imdb_id); // Use destructuring to get movie_id

  useEffect(() => {
    axios
      .get<Movie>(
        `https://api.themoviedb.org/3/movie/${imdb_id}?api_key=${
          import.meta.env.VITE_DB_KEY
        }`
      )
      .then((res) => {
        setMovie(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [imdb_id]);

  console.log(movie);

  if (!movieContext || !movieContext.movies) {
    return <div>Loading...</div>;
  }
  const movies = movieContext.movies;

  const randomOne = Math.floor(Math.random() * 10) + 10;
  const randomTwo = Math.floor(Math.random() * 10) + 10;
  const randomThree = Math.floor(Math.random() * 10) + 10;

  const imagePath = 'https://image.tmdb.org/t/p/original';

  return (
    <section className={styles.movie_container}>
      <div className={styles.sidebar}>
        <Link to='/'>
          <img src={logo_black} alt='logo' className={styles.logo} />
        </Link>

        <ul>
          <Link to='/'>
            <img src={home} alt='home' />
            Home
          </Link>
          <li>
            <img src={movie_icon} alt='movie' />
            Movies
          </li>
          <li>
            <img src={tv} alt='tv' />
            TV Series
          </li>
          <li>
            <img src={calender} alt='calender' />
            Upcoming
          </li>
        </ul>
        <div className={styles.logout}>
          <div className={styles.play}>
            <h4>Play movie quizes and earn free tickets</h4>
            <small>50k people are playing now</small>
            <p>Start playing</p>
          </div>
          <ul>
            <li>
              <img src={logout} alt='logout' />
              Logout
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.movie_details}>
        <div
          className={styles.background}
          style={{
            backgroundImage: `url(${imagePath + movie?.backdrop_path})`,
          }}
        >
          <div className={styles.watch}>
            <img src={play} alt='play icon' />
            <h5>Watch Trailer</h5>
          </div>
        </div>
        <div className={styles.title}>
          <h1>{movie?.original_title}</h1>
          <span></span>
          <h2>{movie?.release_date}</h2>
          <span></span>
          <h2>PG-13</h2>
          <span></span>
          <h2>{movie?.runtime} mins</h2>
          <div className={styles.genre}>
            {movie?.genres.map((genre, idx) => {
              return <h3 key={idx}>{genre.name}</h3>;
            })}
          </div>
        </div>
        <div className={styles.description}>
          <div className={styles.describe}>
            <p>{movie?.overview}</p>
            <div className={styles.tributes}>
              <p>
                Tagline: <span>{movie?.tagline}</span>
              </p>
              <p>
                Popularity: <span>{movie?.popularity}</span>
              </p>
              <p>
                Budget: <span>{movie?.budget}</span>
              </p>
            </div>
            <div className={styles.buts}>
              <p className={styles.red}>Top rated movie #12</p>
              <p className={styles.not_red}>Awards 9 nominations</p>
            </div>
          </div>
          <div className={styles.tab}>
            <div className={styles.tickets}>
              <p>
                <img src={tickets} alt='ticket' /> See Showtimes
              </p>
              <p>
                <img src={list} alt='list' /> More watch option
              </p>
            </div>

            <div className={styles.options}>
              {
                <img
                  src={imagePath + movies[randomOne].poster_path}
                  alt='poster image'
                />
              }
              {
                <img
                  src={imagePath + movies[randomTwo].poster_path}
                  alt='poster image'
                />
              }
              {
                <img
                  src={imagePath + movies[randomThree].poster_path}
                  alt='poster image'
                />
              }
              <div className={styles.best}>
                <img src={list_white} alt='list-icon' />
                <small>The Best Movies and Shows Currently</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Movie;
