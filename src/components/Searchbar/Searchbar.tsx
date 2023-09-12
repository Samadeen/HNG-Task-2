import styles from './Searchbar.module.scss';
import search from '../../assets/Search.svg';

const Searchbar = () => {
  return (
    <form action='' className={styles.searchBar}>
      <label htmlFor='search'>
        <input type='text' placeholder='What do you want to watch?' />
        <img src={search} alt='search icon' />
      </label>
    </form>
  );
};

export default Searchbar;
