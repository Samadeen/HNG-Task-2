import styles from './Header.module.scss';
import logo from '../../assets/Logo.svg';
import menu from '../../assets/Menu.svg';
import Searchbar from '../../components/Searchbar/Searchbar';

interface ShowProps {
  show: boolean;
}

const Header = ({ show }: ShowProps) => {
  return (
    <header className={styles.header}>
      <img src={logo} alt='logo' />
      {show && <Searchbar />}
      <div className={styles.sign_in}>
        <p>Sign in</p>
        <img src={menu} alt='menu icon' />
      </div>
    </header>
  );
};

export default Header;
