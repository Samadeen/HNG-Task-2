import styles from './Hero.module.scss';
import imdb from '../../assets/imdb.svg';
import tomato from '../../assets/tomato.svg';
import play from '../../assets/Play.svg';
import { useContext, useState } from 'react';
import { MovieContext } from '../../api/movie-api';
import Header from '../../layout/Header/Header';
import Roller from '../Roller/Roller';
import { motion as m } from 'framer-motion';

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(1);

  const movieContext = useContext(MovieContext);

  if (!movieContext || !movieContext.movies) {
    return <Roller />;
  }
  const movies = movieContext.movies;

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
          <m.h1
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1, type: 'spring', stiffness: 150 }}
          >
            {firstSix[activeIndex].title}
          </m.h1>
          <m.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1.3, type: 'spring', stiffness: 150 }}
            className={styles.rating}
          >
            <div className={styles.rate_tab}>
              <img src={imdb} alt='imdb icon' />
              <small>{randomRating}.0 / 100</small>
            </div>
            <div className={styles.rate_tab}>
              <img src={tomato} alt='tomato icon' />
              <small>{randomRatingPercentage}%</small>
            </div>
          </m.div>
          <m.p
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1.2, type: 'spring', stiffness: 150 }}
          >
            {firstSix[activeIndex].overview}
          </m.p>
          <m.button
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.7, type: 'spring', stiffness: 150 }}
          >
            <img src={play} alt='play icon' /> Watch Trailer
          </m.button>
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
