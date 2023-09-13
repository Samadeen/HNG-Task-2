import { Link } from 'react-router-dom';
import styles from './SearchCard.module.scss';

interface SearchProps {
  poster_path: string;
  original_title: string;
  overview: string;
  release_date: string;
  id: number;
}

const SearchCard = ({
  poster_path,
  original_title,
  overview,
  release_date,
  id,
}: SearchProps) => {
  const imagePath = 'https://image.tmdb.org/t/p/original';

  return (
    <Link to={`/movies/${id}`} className={styles.search_card}>
      <img src={imagePath + poster_path} alt={original_title} />
      <div className={styles.details}>
        <h3>{original_title}</h3>
        <p>{overview}</p>
      </div>
      <div className={styles.release_date}>
        <p>{release_date}</p>
      </div>
    </Link>
  );
};

export default SearchCard;
