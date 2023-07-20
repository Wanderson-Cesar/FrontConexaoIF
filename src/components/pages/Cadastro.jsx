import FormCadastro from "../project/FormCadastro";
import styles from "../styles/Cadastro.module.css"

function Cadastro(){
    return(
            <div className={styles.container}>
                <div className={styles.content_form}>
                    <h1 className={styles.tittle_Cadastro}>Cadastre-se</h1>
                    <hr/>
                    <FormCadastro />
                </div>
            </div>      
    )
}
export default Cadastro;