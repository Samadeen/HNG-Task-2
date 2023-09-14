import styles from './Card.module.scss';
import imdb from '../../assets/imdb.svg';
import tomato from '../../assets/tomato.svg';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {motion as m} from 'framer-motion'

interface CardProps {
  poster_path: string;
  original_title: string;
  genre_ids: number[];
  vote_average: number;
  release_date: string;
  id: string | null;
}

const Card: React.FC<CardProps> = ({
  poster_path,
  original_title,
  genre_ids,
  vote_average,
  release_date,
  id,
}) => {
  const [toggle, setToggle] = useState(true);
  const randomRatingPercentage: number = Math.floor(Math.random() * 26) + 75;

  const toggleHandler = (e: { preventDefault: () => void }) => {
    setToggle((prevState) => !prevState);
    e.preventDefault();
  };
  // Define a mapping of genre IDs to names
  const genreMap: { [key: number]: string } = {
    28: 'Action',
    12: 'Adventure',
    16: 'Animation',
    35: 'Comedy',
    80: 'Crime',
    99: 'Documentary',
    18: 'Drama',
    10751: 'Family',
    14: 'Fantasy',
    36: 'History',
    27: 'Horror',
    10402: 'Music',
    9648: 'Mystery',
    10749: 'Romance',
    878: 'Science Fiction',
    10770: 'TV Movie',
    53: 'Thriller',
    10752: 'War',
    37: 'Western',
  };

  // Map genre IDs to genre names
  const genreNames: string[] = genre_ids.map(
    (genreID: number) => genreMap[genreID]
  );

  // Sort genre names alphabetically
  genreNames.sort();

  const date = new Date(release_date);
  const utcDate = new Date(date).toUTCString();

  const imagePath = 'https://image.tmdb.org/t/p/original';


  return (
    <Link to={`./movies/${id}`} data-testid= 'movie-card'>
      <m.div 
              initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut', delay: 0.3 }}
       className={styles.card_container}>
        <div className={styles.images}>
          <img src={imagePath + poster_path} alt={original_title} data-testid: movie-poster />
          <svg
            onClick={toggleHandler}
            width='30'
            height='30'
            viewBox='0 0 30 30'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <g filter='url(#filter0_b_1820_401)'>
              <ellipse
                cx='15'
                cy='15.1842'
                rx='15'
                ry='14.6053'
                fill={toggle ? '#F3F4F6' : '#be123c'}
                fillOpacity='0.5'
              />
            </g>
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M8.17157 10.4828C9.73367 8.96185 12.2663 8.96185 13.8284 10.4828L15 11.6236L16.1716 10.4828C17.7337 8.96185 20.2663 8.96185 21.8284 10.4828C23.3905 12.0038 23.3905 14.4698 21.8284 15.9908L15 22.6396L8.17157 15.9908C6.60948 14.4698 6.60948 12.0038 8.17157 10.4828Z'
              fill={toggle ? '#D1D5DB' : '#ef003c'}
            />
            <defs>
              <filter
                id='filter0_b_1820_401'
                x='-2'
                y='-1.42105'
                width='34'
                height='33.2105'
                filterUnits='userSpaceOnUse'
                colorInterpolationFilters='sRGB'
              >
                <feFlood floodOpacity='0' result='BackgroundImageFix' />
                <feGaussianBlur in='BackgroundImageFix' stdDeviation='1' />
                <feComposite
                  in2='SourceAlpha'
                  operator='in'
                  result='effect1_backgroundBlur_1820_401'
                />
                <feBlend
                  mode='normal'
                  in='SourceGraphic'
                  in2='effect1_backgroundBlur_1820_401'
                  result='shape'
                />
              </filter>
            </defs>
          </svg>
        </div>
        <div className={styles.loc}>
          <p data-testid= 'movie-release-date'>{utcDate}</p>
          <h3 data-testid= 'movie-title'>{original_title}</h3>
          <div className={styles.rating}>
            <div className={styles.rate_tab}>
              <img src={imdb} alt='imdb icon' />
              <small>{vote_average} / 10</small>
            </div>
            <div className={styles.rate_tab}>
              <img src={tomato} alt='tomato icon' />
              <small>{randomRatingPercentage}%</small>
            </div>
          </div>
          <div className={styles.genre}>
            {genreNames.map((genre) => <p key={genre}>{genre} </p>).slice(0, 4)}
          </div>
        </div>
      </m.div>
    </Link>
  );
};

export default Card;
