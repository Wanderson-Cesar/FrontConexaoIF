import FormLogin from '../project/FormLogin';
import styles from '../styles/Login.module.css';
import { Link } from "react-router-dom";
import logo from '../../img/connections.png'

function Login(){
    return(
            <div className={styles.conteudoLogin}>
                    <div className={styles.conteudo1}>
                    <h1 className={styles.conteudo_titulo}>Conexão<span>IF</span></h1>
                    <h2 className={styles.conteudo_subTitulo}>Conectando alunos e professores na jornada acadêmica!</h2>
                </div>
                <div className={styles.formulario}>
                    <img src={logo} alt="Logo do site" />
                        <FormLogin />
                    <hr/>
                    <h3>Ainda não tem acesso?</h3>
                    <Link to="/Cadastro"><button className={styles.botaoCadastro}>Cadastrar-se</button></Link>
                </div>
        </div>
        
    )
}
export default Login;