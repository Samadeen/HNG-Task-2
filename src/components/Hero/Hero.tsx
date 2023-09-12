import styles from './Hero.module.scss';
import imdb from '../../assets/imdb.svg';
import tomato from '../../assets/tomato.svg';
import play from '../../assets/Play.svg';
import { useContext, useState } from 'react';
import { MovieContext } from '../../api/movie-api';
import Header from '../../layout/Header/Header';

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(1);

  const movieContext = useContext(MovieContext);

  if (!movieContext || !movieContext.movies) {
    return <div>Loading...</div>;
  }
  const movies = movieContext.movies;

  // Use a single state variable to track the active index

  const handleNumberClick = (index: number) => {
    setActiveIndex(index);
  };
  const firstSix = movies.slice(0, 6);
  const imagePath = 'https://image.tmdb.org/t/p/original';

  const randomRating = Math.floor(Math.random() * 26) + 75;
  const randomRatingPercentage = Math.floor(Math.random() * 26) + 75;

  return (
    <section
      className={styles.hero_container}
      style={{
        backgroundImage: `url(${
          imagePath + firstSix[activeIndex].backdrop_path
        })`,
      }}
    >
      <Header show={true} />
      <div className={styles.hero_wrapper}>
        <div className={styles.details}>
          <h1>{firstSix[activeIndex].title}</h1>
          <div className={styles.rating}>
            <div className={styles.rate_tab}>
              <img src={imdb} alt='imdb icon' />
              <small>{randomRating}.0 / 100</small>
            </div>
            <div className={styles.rate_tab}>
              <img src={tomato} alt='tomato icon' />
              <small>{randomRatingPercentage}%</small>
            </div>
          </div>
          <p>{firstSix[activeIndex].overview}</p>
          <button>
            <img src={play} alt='play icon' /> Watch Trailer
          </button>
        </div>
        <div className={styles.numbers}>
          <p
            className={activeIndex === 1 ? styles.active : ''}
            onClick={() => handleNumberClick(1)}
          >
            1
          </p>
          <p
            className={activeIndex === 2 ? styles.active : ''}
            onClick={() => handleNumberClick(2)}
          >
            2
          </p>
          <p
            className={activeIndex === 3 ? styles.active : ''}
            onClick={() => handleNumberClick(3)}
          >
            3
          </p>
          <p
            className={activeIndex === 4 ? styles.active : ''}
            onClick={() => handleNumberClick(4)}
          >
            4
          </p>
          <p
            className={activeIndex === 5 ? styles.active : ''}
            onClick={() => handleNumberClick(5)}
          >
            5
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
