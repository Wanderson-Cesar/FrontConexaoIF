import styles from './Button.module.css'

function Button({text}){
    return(
        <div className={styles.componenteBtn}>
            <button className={styles.btn_Cadastro}>{text}</button>    
        </div>
    )
}

export default Button;