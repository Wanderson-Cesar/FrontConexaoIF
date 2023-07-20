import styles from './NavBar.module.css'
import { Link } from 'react-router-dom';
import logo from '../../img/connections.png'


function NavBar () {
  return (
    <>
    <header className={styles.cabecalho}>
                <Link to="/">
                  <img src={logo} alt="Logo do site" className={styles.image}/>
                </Link>
                <nav className={styles.navbar}>
                    <Link to="/" className={styles.item} style={{ color: 'inherit' }}>Home</Link>
                    <Link to="/Sobre" className={styles.item} style={{ color: 'inherit' }}>Sobre</Link>
                    <Link to="/Login" className={`${styles.item} ${styles.item2}`} style={{ color: 'inherit' }}>Entrar</Link>
                </nav>
      </header>
  </>
  )
}

export default NavBar;