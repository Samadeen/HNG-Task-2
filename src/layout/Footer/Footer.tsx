import styles from './Footer.module.scss';
import facebook from '../../assets/facebook.svg';
import instagram from '../../assets/instagram.svg';
import twitter from '../../assets/twitter.svg';
import youtube from '../../assets/youtube.svg';

const Footer = () => {
  return (
    <section className={styles.footer_container}>
      <div className={styles.socials}>
        <img src={facebook} alt='facebook' />
        <img src={instagram} alt='instagram' />
        <img src={twitter} alt='twitter' />
        <img src={youtube} alt='youtube' />
      </div>
      <div className={styles.links}>
        <ul>
          <li>Conditions of Use</li>
          <li>Privacy & Policy</li>
          <li>Press Room</li>
        </ul>
      </div>
      <p>© 2021 MovieBox by Adriana Eka Prayudha </p>
    </section>
  );
};

export default Footer;
