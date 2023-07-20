import React, { useState } from "react";
import styles from './AdminNavBar.module.css' 
import { Link } from "react-router-dom";
import logo from '../../img/connections.png'

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
      <button onClick={toggleSidebar}>
      <Link to="/" style={{ color: 'inherit' }}>
        <img src={logo} alt="Logo do site" className={styles.image}/>
        <p>ConexaoIF</p>
    </Link>
      </button>
      
        <nav className={styles.navbar}>
            <Link to="/Alunos" className={styles.item} style={{ color: 'inherit' }}>Alunos</Link>
            <Link to="/Coordenador" className={styles.item} style={{ color: 'inherit' }}>Coordenadores</Link>
            <Link to="/Curso" className={styles.item} style={{ color: 'inherit' }}>Curso</Link>
            <Link to="/Endereco" className={styles.item} style={{ color: 'inherit' }}>Endereço</Link>
            <Link to="/Grupo" className={styles.item} style={{ color: 'inherit' }}>Grupo</Link>
            <Link to="/Alunogrupo" className={styles.item} style={{ color: 'inherit' }}>Alunogrupo</Link>
            <Link to="/Instituicao" className={styles.item} style={{ color: 'inherit' }}>Instituicao</Link>
            <Link to="/Periodos" className={styles.item} style={{ color: 'inherit' }}>Periodos</Link>
            <Link to="/Professor" className={styles.item} style={{ color: 'inherit' }}>Professor</Link>
            <Link to="/Login" className={`${styles.item} ${styles.item2}`} style={{ color: 'inherit' }}>Sair</Link>
        </nav>
    </div>
  );
}

export default Sidebar;
