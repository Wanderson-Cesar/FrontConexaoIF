import styles from '../styles/Home.module.css'
import logo2 from '../../img/www.gif'
import { Link } from 'react-router-dom'

function Home() {
    return(
        <div className={styles.container}>
        <main className={styles.conteudo}>
            <section className={styles.sessao1}>
                <div className={styles.conteudo1}>
                    <h1 className={styles.conteudo_titulo}>Conexão<span>IF</span></h1>
                    <h2 className={styles.conteudo_subTitulo}>Conectando alunos e professores na jornada acadêmica!</h2>
                    <Link to="/Login"><button className={styles.btn}>Entre Agora!</button></Link>
                </div>
                <img src={logo2} alt='Imagem inicial' className={styles.image2}/>
            </section>
            <section className={styles.conteudo_secundario}>
                <h3 className={styles.tittle_secundario}>O que o ConexãoIF faz por você?</h3>
                <div className={styles.conteudo_texto}>
                    <p className={styles.texto}><strong>Vantagem 1</strong>Permite que o coordenador crie grupos específicos para suas turmas, 
                    facilitando a comunicação direta e eficiente entre professores e alunos. Isso elimina a necessidade de utilizar 
                    diferentes canais de comunicação e centraliza todas as interações em um só lugar.</p>      
                    <p className={styles.texto}><strong>Vantagem 2</strong>Possibilita que o coordenador envie mensagens pré-definidas 
                    ou programadas para serem entregues automaticamente aos alunos. Isso pode incluir informações sobre 
                    tarefas, lembretes, avisos importantes e até mesmo links de materiais de estudo.</p>      
                    <p className={styles.texto}><strong>Vantagem 3</strong>Permite que o coordenador compartilhe via links arquivos, como apresentações, 
                    documentos e vídeos úteis, diretamente com os alunos. Isso facilita o acesso aos materiais 
                    de estudo e promove um ambiente virtual de aprendizado colaborativo.</p>                
                </div>   
            </section>
        </main>
        </div>
    )
}
export default Home;